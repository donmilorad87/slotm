'use strict';

import SlotWeels from '/slotm/assets/script/classes/slot_weels.js'; 
import DrawLines from '/slotm/assets/script/classes/draw_lines.js'; 
import LogoSprite from '/slotm/assets/script/classes/logo_sprite.js'; 


const drawLines = {};
drawLines.instance = new DrawLines();

const slotWeels = {};
slotWeels.instance = new SlotWeels(drawLines.instance);

const sprite = {};
sprite.instance = new LogoSprite()

