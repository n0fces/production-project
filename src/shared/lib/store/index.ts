// я очень скептично отношусь к появлению вот таких слоев абстракции в уже и так довольно абстрактной системе
// из-за создания таких прослоек на useSelector, useDispatch мы получаем большое количество кастомных хуков,
// которые не являются стандартизированными и распространными. Использование таких хуков будет только вызывать массу вопросов
// у людей, которые только заходят на проект. Проблемы могут возникнуть даже у тех, кто когда-то давно работал над проектов, но
// отошел от него на некоторое время. Снова придется привыкать к тому, что есть такие прослойки, из-за которых
// появляется большое количество кастомных хуков. Все это в конечном счете дает просто отсутствие одной строчки импорта
// для useSelector, useDispatch. Да и тем более когда мы встречаем useSelector, то мы понимаем, что это выборка данных. Далее
// по имени селектора мы можем уже предположить, что за данные спрашиваются. по useDispatch мы понимаем, что вызывается какой-то экшн. По
// имени экшена можем понять, что за действие происходит. Конечно и в нейминге кастомных хуков мы можем сделать определенные отметки, что
// это связано с выборкой данных, а это связано с вызовом экшена, но это, как по мне, лишний слой абстракции
export { buildSelector } from './buildSelector';
export { buildSlice } from './buildSlice';