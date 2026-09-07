// Footer copy follows Figma 111:8738; case copy is translated from the Russian case.
const translations = {
 'Перейти к кейсу':'Skip to case study','ОБО МНЕ':'ABOUT','ПРОЕКТЫ':'CASES','КОНТАКТЫ':'CONTACTS',
 'Аудит национальной платежной системы':'National Payment Card System audit',
 'НСПК — это B2B-платформа, которая обрабатывает заявки от банков на выпуск карт «МИР».':'NSPK is a B2B platform that processes banks’ applications to issue MIR cards.',
 'Я провела UX-аудит, выявила проблемные зоны, которые мешают легко подключать новые банки, и предложила улучшения через редизайн ключевых сценариев.':'I conducted a UX audit, identified barriers to onboarding new banks, and proposed improvements by redesigning key workflows.',
 'Команда':'Team','Дата':'Date','Роль':'Role','Продуктовый дизайнер':'Product Designer','Процесс':'Process','Мария Штейн, Project Lead':'Maria Stein, Project Lead',
 'Компания планировала масштабировать систему и подключать больше банков и пользователей. При этом высокий порог входа в работу с системой требовал личного обучения новых сотрудников опытными коллегами.':'The company planned to scale the system and onboard more banks and users. However, the steep learning curve meant experienced colleagues had to train new employees individually.',
 'Это делало рост платформы дорогим и критически зависимым от человеческого фактора.':'This made platform growth expensive and heavily dependent on people.',
 'Бизнес-цели':'Business goals','Уменьшить TTV':'Reduce TTV','Ускорить онбординг новых сотрудников банков':'Speed up onboarding for new bank employees','Снизить Operational Costs':'Reduce operational costs','Уменьшить количество обращений в поддержку':'Reduce support requests','Унифицировать систему':'Unify the system','Привести компоненты к единому стандарту':'Bring components to a consistent standard',
 'Исследования':'Research','Выявленные проблемы были не отдельными недостатками интерфейса: они проявили глубинное несоответствие между сложностью системы и возможностями пользователей.':'The issues were more than isolated interface flaws: they revealed a deeper mismatch between the system’s complexity and users’ capabilities.',
 'Система структурно зрелая, но когнитивно перегруженная':'Structurally mature, but cognitively overwhelming',
 'Система выглядела аккуратно и логично, но в ней было много полей, настроек и терминов, почти не было подсказок, ошибки объяснялись слабо.':'The system looked clean and logical, but had too many fields, settings, and technical terms, with few hints and poorly explained errors.',
 'Новым пользователям было трудно понять, что от них ждут и в каком порядке действовать.':'New users struggled to understand what was expected of them and which steps to take first.',
 'Функциональность не адаптирована под уровень подготовки пользователя':'Functionality did not adapt to user experience',
 'Один и тот же интерфейс предлагал одинаковый набор действий и настроек всем пользователям — и новичкам, и опытным специалистам. Система не помогала постепенно освоиться и перейти от простых задач к более сложным.':'The interface offered the same actions and settings to beginners and experts alike. It did not help users learn gradually and move from simple tasks to more complex ones.',
 'Отсутствует визуальная приоритизация и поддержка принятия решений':'No visual prioritization or decision support',
 'Пользователю приходилось самому разбираться, какие поля обязательные, какие действия важнее и на каком этапе он находится, из-за чего возрастал риск ошибок и замедлялась работа.':'Users had to work out which fields were required, which actions mattered most, and where they were in the process. This increased errors and slowed down their work.',
 'Тестирование System Usability Scale для оценки удобства интерфейса':'System Usability Scale testing to assess usability','Оценка пользовательских сценариев по эвристикам Нильсена':'Evaluation of user workflows using Nielsen’s heuristics','Проработка решений через редизайн ключевых сценариев':'Developing solutions by redesigning key workflows','Тестирование сценариев на контрольной группе':'Testing workflows with a control group',
 'Принцип Progressive Disclosure':'Progressive disclosure',
 'Я разделила сценарии на базовые и расширенные. Базовый сценарий фокусирует на обязательных полях для быстрого старта, а расширенный даёт полный контроль опытным пользователям.':'I separated basic and advanced workflows. The basic flow focuses on required fields for a quick start, while the advanced flow gives experienced users full control.',
 'Переработка дизайн-системы':'Design system overhaul','Я провела ревизию всех компонентов, удалила лишние сущности и создала унифицированные паттерны для фильтров, таблиц и форм.':'I audited every component, removed unnecessary elements, and created consistent patterns for filters, tables, and forms.',
 'Контекстное обучение':'Contextual learning','Инструкции были оформлены отдельным документом, вынуждая постоянно обращаться к файлам и тратить время на загрузку и поиск нужной информации.':'Instructions lived in a separate document, forcing users to keep opening files and spend time downloading and searching for information.','Я исправила это и интегрировала базы знаний в интерфейс.':'I addressed this by integrating the knowledge base into the interface.',
 'Встроенная поддержка принятия решений':'Built-in decision support','Внедрила Contextual Help и визуальное выделение рекомендованных значений.':'I introduced contextual help and visual highlighting for recommended values.',
 'Результаты':'Results','Команда НСПК внедрила улучшения по 15+ ключевым сценариям, убирая ограничения для роста платформы.':'The NSPK team improved over 15 key workflows, removing barriers to platform growth.','Продукт получил фундамент для быстрого онбординга новых банков-партнёров, снизил нагрузку на отдел поддержки и уменьшил количество брака при выпуске карт.':'The product gained a foundation for faster onboarding of partner banks, reduced support workload, and fewer card issuance errors.',
 'ошибок':'errors','Допускаемых при первом прохождении сценариев новыми пользователями':'Made by new users completing workflows for the first time','Меньше обращений в поддержку благодаря понятному интерфейсу':'Fewer support requests thanks to a clearer interface','Новые пользователи успешно завершали задачи без помощи извне':'New users completed tasks successfully without outside help',
 'Следующий кейс':'Next case','Личный кабинет клиента ВТБ НПФ':'VTB NPF customer portal','До':'Before','После':'After',
 'ЗАВАЙБКОЖЕНО @KRAWLEEK В 2026':'VIBECODED BY @KRAWLEEK IN 2026','КТО ЕСТЬ KRAWLEEK?':'WHO IS KRAWLEEK?','КЕЙСЫ':'CASES','АУДИТ ПЛАТФОРМЫ НСПК':'CPVT PLATFORM AUDIT','РЕДИЗАЙН КАБИНЕТА ВТБ НПФ':'VTB NPF PORTAL REDESIGN','ИИ АССИСТЕНТ АЛЬФА БАНКА':'ALFA BANK AI ASSISTANT','ОНБОРДИНГ В WASD':'WASD ONBOARDING','ССЫЛКИ':'LINKS'
};
export function initCaseLanguage(extra={},titles={ru:'Аудит платформы НСПК — Елена Юнг',en:'NSPK platform audit — Elena Jung'}){
const dictionary={...translations,...extra};
const nodes=[];
const walker=document.createTreeWalker(document.querySelector('#case-root'),NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode, ru=node.textContent, key=ru.trim();
 if(dictionary[key])nodes.push({node,ru,en:ru.replace(key,dictionary[key])});
}
const buttons=[...document.querySelectorAll('[data-lang]')];
function setLanguage(lang){
 document.documentElement.lang=lang;
 nodes.forEach(({node,ru,en})=>node.textContent=lang==='en'?en:ru);
 buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));
 document.title=titles[lang];
}
buttons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));

}
