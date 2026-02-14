// Clase 02: Productividad Agéntica
// 23 slides en 5 módulos

import { Slide01Cover } from './slides/Slide01Cover';
import { Slide02Agenda } from './slides/Slide02Agenda';
import { Slide03Mod01Divider } from './slides/Slide03Mod01Divider';
import { Slide04EraAgentica } from './slides/Slide04EraAgentica';
import { Slide05Practicante } from './slides/Slide05Practicante';
import { Slide06VentanaContexto } from './slides/Slide06VentanaContexto';
import { Slide07CROP } from './slides/Slide07CROP';
import { Slide08MetaPrompting } from './slides/Slide08MetaPrompting';
import { Slide09Mod02Divider } from './slides/Slide09Mod02Divider';
import { Slide10JefeDeObra } from './slides/Slide10JefeDeObra';
import { Slide11Lienzos } from './slides/Slide11Lienzos';
import { Slide12Mod03Divider } from './slides/Slide12Mod03Divider';
import { Slide13SuiteClaude } from './slides/Slide13SuiteClaude';
import { Slide14NotebookLM } from './slides/Slide14NotebookLM';
import { Slide15NanoBanana } from './slides/Slide15NanoBanana';
import { Slide16Mod04Divider } from './slides/Slide16Mod04Divider';
import { Slide17Modelos } from './slides/Slide17Modelos';
import { Slide18Mod05Divider } from './slides/Slide18Mod05Divider';
import { Slide19AnatomiaAgentica } from './slides/Slide19AnatomiaAgentica';
import { Slide20Manus } from './slides/Slide20Manus';
import { Slide21Operator } from './slides/Slide21Operator';
import { Slide22Director } from './slides/Slide22Director';
import { Slide23Closing } from './slides/Slide23Closing';

export const clase02Config = {
  numero: 2,
  nombre: 'Productividad Agéntica',
  descripcion: 'De la Charla a la Ejecución.',
  stack: ['Claude', 'GPT-5.2', 'Perplexity', 'DeepSeek', 'Manus', 'NotebookLM'],
  temas: [
    { id: 'intro', nombre: 'Inicio', slides: [1, 2] },
    { id: 'fundamentos', nombre: 'Fundamentos', slides: [3, 4, 5, 6, 7, 8] },
    { id: 'orquestador', nombre: 'Orquestador', slides: [9, 10, 11] },
    { id: 'suite-claude', nombre: 'Suite Claude', slides: [12, 13, 14, 15] },
    { id: 'modelos', nombre: 'Modelos', slides: [16, 17] },
    { id: 'agentes', nombre: 'Agentes', slides: [18, 19, 20, 21, 22] },
    { id: 'cierre', nombre: 'Cierre', slides: [23] },
  ],
};

export const clase02Slides = [
  Slide01Cover,
  Slide02Agenda,
  Slide03Mod01Divider,
  Slide04EraAgentica,
  Slide05Practicante,
  Slide06VentanaContexto,
  Slide07CROP,
  Slide08MetaPrompting,
  Slide09Mod02Divider,
  Slide10JefeDeObra,
  Slide11Lienzos,
  Slide12Mod03Divider,
  Slide13SuiteClaude,
  Slide14NotebookLM,
  Slide15NanoBanana,
  Slide16Mod04Divider,
  Slide17Modelos,
  Slide18Mod05Divider,
  Slide19AnatomiaAgentica,
  Slide20Manus,
  Slide21Operator,
  Slide22Director,
  Slide23Closing,
];

export {
  Slide01Cover,
  Slide02Agenda,
  Slide03Mod01Divider,
  Slide04EraAgentica,
  Slide05Practicante,
  Slide06VentanaContexto,
  Slide07CROP,
  Slide08MetaPrompting,
  Slide09Mod02Divider,
  Slide10JefeDeObra,
  Slide11Lienzos,
  Slide12Mod03Divider,
  Slide13SuiteClaude,
  Slide14NotebookLM,
  Slide15NanoBanana,
  Slide16Mod04Divider,
  Slide17Modelos,
  Slide18Mod05Divider,
  Slide19AnatomiaAgentica,
  Slide20Manus,
  Slide21Operator,
  Slide22Director,
  Slide23Closing,
};
