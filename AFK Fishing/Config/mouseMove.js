let canLook = true;const keyTurnLeft = new KeyBind("Left", Keyboard.KEY_NONE, "aaaa");const keyTurnRight = new KeyBind("Right", Keyboard.KEY_NONE, "aaaa");let fromYaw;let fromPitch;let destYaw;let destPitch;let startTime;let time;function convertYawToInternal(destinationYaw){let currentYaw = Player.getPlayer().field_70177_z;
let mcYaw = ((currentYaw + 180) %360) - 180;
let deltaYaw = mcYaw - destinationYaw;deltaYaw += (deltaYaw>180) ? -360 : (deltaYaw<-180) ? 360 : 0;return currentYaw - deltaYaw;};function interpolate(f, t, start, dur){let x = Date.now() - start;let u = (f-t)/2;return u*Math.cos(((x*Math.PI)/dur)) - u + f;};
function getAngle(x, y, z){let dx = x - Player.getX();let dy = y - Player.getY() - Player.getPlayer().func_70047_e();let dz = z - Player.getZ();let toYaw = toDegrees(Math.atan2(dz, dx)) - 90;if(toYaw <= -180){;toYaw += 360;};let h = Math.sqrt(dx*dx+dz*dz);let toPitch = -(toDegrees(Math.atan2(dy, h)));return {
yaw: toYaw,pitch: toPitch};};function toDegrees(rad){return rad * (180/Math.PI);};function smoothLook(dYaw, dPitch, dTime){if(!canLook) return;time = dTime;canLook = false;shouldLook = true;fromYaw = Player.getPlayer().field_70177_z;
fromPitch = Player.getPlayer().field_70125_A;destYaw = dYaw;destPitch = dPitch;startTime = Date.now();}let shouldLook = false;register("renderWorld", () => {if(!shouldLook) return;if(Date.now() <= (startTime + time)){let newYaw = interpolate(fromYaw ,convertYawToInternal(destYaw), startTime, time);
let newPitch = interpolate(fromPitch ,destPitch, startTime, time);Player.getPlayer().field_70177_z = newYaw;Player.getPlayer().field_70125_A = newPitch;} else {shouldLook = false;canLook = true;}});let scriptToggle = false;let timesinceLastActivate = new Date().getTime();let currentyaw;
let currentpitch;let updateAxisToggle = false;let lookCooldown = true;register("step", () => {if (keyTurnLeft.isPressed()) {currentyaw = Player.getYaw();currentpitch = Player.getPitch();if(currentpitch > -80 && currentpitch < 80 && lookCooldown) {lookCooldown = false;const move1 = (Math.random() * 20) - 10;
const move2 = (Math.random() * 10) - 5;const move3 = move1 + (Math.random() - 0.5);const move4 = move2 + (Math.random() - 0.5);new Thread(() => {smoothLook(Player.getYaw() + move2 , Player.getPitch() + move1, 100 + Math.random() * 75);Thread.sleep(200);smoothLook(Player.getYaw() - move4, Player.getPitch() - move3, 100 + Math.random() * 75);Thread.sleep(200);
lookCooldown = true;}).start();};};}).setFps(40);const moveMouseRandom = () => {if (true) {currentyaw = Player.getYaw();currentpitch = Player.getPitch();if(currentpitch > -80 && currentpitch < 80 && lookCooldown) {lookCooldown = false;const move1 = (Math.random() * 20) - 10;const move2 = (Math.random() * 10) - 5;
const move3 = move1 + (Math.random() - 0.5);const move4 = move2 + (Math.random() - 0.5);new Thread(() => {smoothLook(Player.getYaw() + move2 , Player.getPitch() + move1, 100 + Math.random() * 75);Thread.sleep(200);smoothLook(Player.getYaw() - move4, Player.getPitch() - move3, 100 + Math.random() * 75);Thread.sleep(200);
lookCooldown = true;}).start();};};};export { moveMouseRandom }