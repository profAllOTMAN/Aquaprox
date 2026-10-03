"""Build and render the first AQUAPROX boiler-room concept from CC0 source assets.

Run from the repository root:
  blender --background blender/source/modular_industrial_pipes_01_1k.blend \
    --python blender/scripts/build_chaufferie_concept.py
"""

from pathlib import Path
import math
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "blender" / "source"
OUTPUT = ROOT / "public" / "assets" / "scenes" / "risks" / "air"
BLEND_OUTPUT = ROOT / "blender" / "aquaprox_chaufferie_concept.blend"


def collection(name):
    found = bpy.data.collections.get(name)
    if found:
        return found
    found = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(found)
    return found


def move_to(obj, target):
    for current in list(obj.users_collection):
        current.objects.unlink(obj)
    target.objects.link(obj)


def material(name, color, metallic=0.0, roughness=0.45, emission=None):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = 3.5
    return mat


def finish(obj, name, mat, target, bevel=0.06):
    obj.name = name
    move_to(obj, target)
    if mat:
        obj.data.materials.append(mat)
    if bevel and obj.type == "MESH":
        modifier = obj.modifiers.new("Soft industrial edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 3
    return obj


def box(name, location, scale, mat, target, bevel=0.06):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(obj, name, mat, target, bevel)


def cylinder(name, location, radius, depth, mat, target, rotation=(0, 0, 0), vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    return finish(bpy.context.object, name, mat, target, 0.045)


def sphere(name, location, radius, mat, target):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=radius, location=location)
    return finish(bpy.context.object, name, mat, target, 0)


def pipe_between(name, start, end, radius, mat, target):
    start_v, end_v = Vector(start), Vector(end)
    delta = end_v - start_v
    midpoint = (start_v + end_v) / 2
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=radius, depth=delta.length, location=midpoint)
    obj = bpy.context.object
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = delta.to_track_quat("Z", "Y")
    return finish(obj, name, mat, target, 0.025)


def look_at(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat("-Z", "Y").to_euler()


environment = collection("00_ENVIRONMENT")
network = collection("02_HEATING_NETWORK")
base_equipment = collection("04_EQUIPMENT_BASE")
risk_state = collection("05_RISK_STATE")
solution = collection("06_AQUAPROX_SOLUTION")
lighting = collection("07_LIGHTING")
cameras = collection("08_CAMERAS_LOCKED")

# Relink the downloaded Poly Haven textures and keep the source pipes as the network library.
for image in bpy.data.images:
    if image.filepath.startswith("//textures/"):
        candidate = SOURCE / "textures" / Path(image.filepath).name
        if candidate.exists():
            image.filepath = str(candidate)
            image.reload()

source_pipes = [obj for obj in bpy.data.objects if obj.name.startswith("modular_industrial_pipes_01_")]
pipe_positions = [
    (-3.9, 2.78, 2.35), (-2.75, 2.78, 2.0), (-1.55, 2.78, 2.1),
    (-0.3, 2.78, 2.9), (0.85, 2.78, 2.9), (1.9, 2.78, 2.55),
    (2.85, 2.78, 2.65), (3.75, 2.72, 1.35),
]
for index, obj in enumerate(source_pipes):
    move_to(obj, network)
    obj.location = pipe_positions[index % len(pipe_positions)]
    obj.scale = (1.55, 1.55, 1.55)
    obj.rotation_euler[2] = math.radians(0 if index < 3 else (90 if index in (3, 4) else 0))

wall = material("Concrete warm grey", (0.16, 0.18, 0.19), roughness=0.82)
floor_mat = material("Industrial floor", (0.08, 0.11, 0.12), roughness=0.68)
steel = material("Equipment steel", (0.2, 0.28, 0.31), metallic=0.72, roughness=0.32)
dark_steel = material("Dark steel", (0.045, 0.075, 0.085), metallic=0.65, roughness=0.28)
red = material("Warning red", (0.48, 0.035, 0.02), metallic=0.18, roughness=0.3, emission=(0.65, 0.035, 0.01))
aqua = material("AQUAPROX aqua", (0.02, 0.46, 0.58), metallic=0.3, roughness=0.22, emission=(0.02, 0.32, 0.46))
glass = material("Air bubbles", (0.18, 0.64, 0.82), metallic=0.0, roughness=0.08, emission=(0.03, 0.33, 0.55))
copper = material("Copper pipe", (0.44, 0.16, 0.065), metallic=0.78, roughness=0.3)

# Room shell.
box("Floor", (0, 0.7, -0.16), (5.3, 3.2, 0.16), floor_mat, environment, 0.02)
box("Back wall", (0, 3.05, 2.45), (5.3, 0.12, 2.6), wall, environment, 0.02)
box("Left wall", (-5.15, 0.7, 2.45), (0.12, 2.25, 2.6), wall, environment, 0.02)
for x in (-4.2, -2.1, 0, 2.1, 4.2):
    box(f"Floor rail {x}", (x, 0.7, 0.015), (0.025, 3.0, 0.018), steel, environment, 0)

# Existing production equipment.
for index, x in enumerate((-3.15, -1.45)):
    cylinder(f"Boiler {index + 1}", (x, 1.38, 1.08), 0.68, 2.15, dark_steel, base_equipment)
    cylinder(f"Boiler collar {index + 1}", (x, 1.38, 2.18), 0.42, 0.22, steel, base_equipment)
    cylinder(f"Boiler gauge {index + 1}", (x, 0.69, 1.38), 0.19, 0.12, steel, base_equipment, rotation=(math.pi / 2, 0, 0))

# Main heating loop and pump.
pipe_between("Heating supply", (-4.2, 0.72, 3.25), (3.95, 0.72, 3.25), 0.115, copper, network)
pipe_between("Heating return", (-4.2, 1.1, 2.75), (3.95, 1.1, 2.75), 0.115, steel, network)
cylinder("Main pump", (0.35, 0.85, 1.08), 0.54, 0.7, steel, base_equipment, rotation=(math.pi / 2, 0, 0))
cylinder("Pump core", (0.35, 0.46, 1.08), 0.28, 0.1, aqua, base_equipment, rotation=(math.pi / 2, 0, 0))
box("Control cabinet", (1.55, 2.55, 1.35), (0.62, 0.22, 1.18), dark_steel, base_equipment)
for z in (0.75, 1.2, 1.65):
    sphere(f"Control light {z}", (1.55, 2.3, z), 0.065, aqua if z != 1.65 else red, base_equipment)

# BEFORE: air bubbles and unstable red signal.
for index, location in enumerate(((-0.8, 0.72, 3.25), (-0.2, 0.72, 3.25), (0.45, 0.72, 3.25), (1.0, 0.72, 3.25))):
    sphere(f"Air bubble {index + 1}", location, 0.09 + index * 0.012, glass, risk_state)
box("Pressure alert", (2.85, 2.74, 1.85), (0.38, 0.08, 0.22), red, risk_state, 0.025)

# AFTER: compact degassing unit, highlighted but technically neutral enough for expert refinement.
cylinder("Degasser vessel", (2.85, 1.15, 1.28), 0.43, 2.35, steel, solution)
cylinder("Degasser head", (2.85, 1.15, 2.52), 0.23, 0.28, dark_steel, solution)
cylinder("Degasser base", (2.85, 1.15, 0.16), 0.57, 0.16, dark_steel, solution)
cylinder("Degasser status", (2.85, 0.71, 1.72), 0.16, 0.08, aqua, solution, rotation=(math.pi / 2, 0, 0))
pipe_between("Degasser inlet", (2.2, 1.15, 1.7), (2.85, 1.15, 1.7), 0.09, copper, solution)
pipe_between("Degasser outlet", (2.85, 1.15, 0.85), (3.55, 1.15, 0.85), 0.09, steel, solution)

# Camera and lighting.
bpy.ops.object.camera_add(location=(9.8, -12.8, 6.2))
camera = bpy.context.object
camera.name = "CAM_CHAUFFERIE_LOCKED"
camera.data.lens = 52
look_at(camera, (0, 1.15, 1.75))
move_to(camera, cameras)
bpy.context.scene.camera = camera

def area_light(name, location, energy, color, size, target_point):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.color = color
    data.shape = "DISK"
    data.size = size
    obj = bpy.data.objects.new(name, data)
    lighting.objects.link(obj)
    obj.location = location
    look_at(obj, target_point)
    return obj


area_light("Key softbox", (1.5, -3.2, 5.6), 1350, (0.72, 0.88, 1.0), 4.5, (0, 1, 1.5))
area_light("Warm equipment rim", (-4.2, 1.2, 4.4), 900, (1.0, 0.52, 0.25), 2.6, (-1.2, 1.3, 1.6))
area_light("Aqua solution rim", (4.2, 0.2, 3.6), 850, (0.2, 0.82, 1.0), 2.0, (2.85, 1.15, 1.4))

world = bpy.context.scene.world or bpy.data.worlds.new("Boiler Room World")
bpy.context.scene.world = world
world.use_nodes = True
nodes = world.node_tree.nodes
links = world.node_tree.links
nodes.clear()
env = nodes.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(str(SOURCE / "boiler_room_1k.hdr"), check_existing=True)
background = nodes.new("ShaderNodeBackground")
background.inputs["Strength"].default_value = 0.28
output = nodes.new("ShaderNodeOutputWorld")
links.new(env.outputs["Color"], background.inputs["Color"])
links.new(background.outputs["Background"], output.inputs["Surface"])

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 1600
scene.render.resolution_y = 640
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGB"
scene.render.image_settings.quality = 88
scene.render.film_transparent = False
scene.render.image_settings.color_depth = "8"
scene.view_settings.look = "Medium High Contrast"
scene.render.filepath = str(OUTPUT / "before.webp")
scene.render.use_file_extension = True
OUTPUT.mkdir(parents=True, exist_ok=True)

# Save the editable scene with the BEFORE state active.
risk_state.hide_render = False
solution.hide_render = True
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_OUTPUT))
bpy.ops.render.render(write_still=True)

# Render AFTER from the exact same camera and lighting.
risk_state.hide_render = True
solution.hide_render = False
scene.render.filepath = str(OUTPUT / "after.webp")
bpy.ops.render.render(write_still=True)

# Restore the editable file to the BEFORE state and pack the CC0 textures/HDRI.
risk_state.hide_render = False
solution.hide_render = True
try:
    bpy.ops.file.pack_all()
except RuntimeError:
    pass
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_OUTPUT))
print(f"AQUAPROX concept saved to {BLEND_OUTPUT}")
print(f"Renders saved to {OUTPUT}")
