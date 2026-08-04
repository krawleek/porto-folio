const NDA_KEY = 'portfolio-nda-authenticated';
const PASSWORD = '121064';

const projects = {
  nspk: {
    title: 'UX-аудит платформы Национальной Системы Платежных Карт',
    shortTitle: 'Национальная Система Платежных Карт',
    eyebrow: 'FINTECH · B2B · 2024',
    image: '/assets/project-mir.png',
    headerImage: '/assets/nspk-header-figma.png',
    nda: true,
    description: 'Предложила UI-улучшения для B2B-платформы для выпуска банковских карт, проработала адаптивную модель интерфейса и привела к единой логике разрозненную дизайн-систему.',
    company: 'НСПК — это B2B-платформа, которая обрабатывает заявки от банков на выпуск карт «Мир». Ею пользуются сотрудники банков, специалисты по выпуску карт и операторы платформы.',
    goal: 'Провести UX-аудит B2B-платформы, выявить проблемные зоны, которые мешают легко подключать новых пользователей и команды, и предложить улучшения через редизайн ключевых сценариев.',
    result: 'Редизайн интерфейса по выводам из исследования снизил количество пользовательских ошибок и упростил выполнение задач для новых сотрудников НСПК. Ушла необходимость проводить дополнительное время- и ресурсозатратное обучение сотрудников, что позволило подготовить платформу к масштабированию и подключению новых банков-клиентов.',
  },
  vtb: {
    title: 'Проектирование личного кабинета клиента ВТБ НПФ',
    shortTitle: 'Личный кабинет ВТБ НПФ',
    eyebrow: 'FINTECH · B2C · 2023',
    image: '/assets/project-vtb.png',
    headerImage: '/assets/vtb-header-bg.png',
    headerOverlay: '/assets/vtb-header-overlay.png',
    headerVariant: 'vtb',
    nextImage: '/assets/next-case-vtb.png',
    nextTitle: 'Спроектировала кабинета клиента ВТБ НПФ',
    nextDescription: 'Пересобрала пользовательские сценарии и продуктовую логику',
    nda: true,
    description: 'Провела редизайн личного кабинета ВТБ НПФ, пересобрала пользовательские сценарии и продуктовую логику для повышения Task Success Rate в платёжных сценариях и заложения основы для роста регулярных взносов.',
    company: 'ВТБ НПФ — один из крупнейших негосударственных пенсионных фондов России (11 млн клиентов), управляющий долгосрочными накоплениями граждан.',
    goal: 'Редизайн легаси-системы на основе UX-аудита, устранение барьеров в критических сценариях (взносы, автоплатёж) и разработка новой продуктовой логики кабинета, с фокусом на достижение долгосрочной финансовой цели.',
    result: 'Редизайн превратил сложный легаси-интерфейс в прозрачный финансовый инструмент, где пользователи начали четко видеть источники роста своих накоплений. Это заложило основу для роста конверсии в автоплатежи и повысило долгосрочное доверие клиентов к фонду как к экспертному финансовому партнеру.',
  },
  wasd: {
    title: 'Трансформация онбординга в WASD',
    shortTitle: 'Онбординг WASD.TV',
    eyebrow: 'FUNTECH · B2C · 2022',
    image: '/assets/project-wasd.png',
    headerImage: '/assets/wasd-header.png',
    headerVariant: 'wasd',
    nextImages: ['/assets/next-case-wasd-bg.png','/assets/next-case-wasd-overlay.png'],
    nextTitle: 'Предложила улучшения онбординга WASD',
    nextDescription: 'От линейного онбординга к growth-механизму',
    nda: true,
    description: 'Разработала систему активации пользователей, трансформировав линейный онбординг в growth-механизм. Это позволило сократить churn rate на ранних этапах и увеличить D7 Retention.',
    company: 'WASD.TV — это стриминговая платформа в экосистеме МТС, ориентированная на live-streaming и gaming-аудиторию. Проект развивали с 2019 по 2023 год.',
    goal: 'Основная проблема платформы — высокая стоимость привлечения пользователей и сложность их удержания при миграции с привычных сервисов. Этот кейс про то, как пересобрать онбординг в систему активации и удержания пользователей, сократив Time-to-Value и снизив churn в первые дни использования платформы.',
    result: 'Рост ключевых метрик: D7 Retention, увеличение Activation Rate в первые 30 минут на платформе, снижение нагрузки на поддержку, формирование базы для роста LTV через вовлечение и монетизацию. Онбординг стал инструментом управления поведением пользователя, а не формальным этапом после регистрации.',
  },
  alfa: {
    title: 'Проектирование AI-ассистента в Альфа Банке',
    shortTitle: 'ИИ-ассистент Альфа 2.0',
    eyebrow: 'FINTECH · B2C · 2025',
    image: '/assets/project-alfa-b.png',
    headerImage: '/assets/alfa-header-final.png',
    headerVariant: 'alfa',
    displayNda: true,
    nextImage: '/assets/next-case-alfa.png',
    nextTitle: 'Выиграла конкурс Альфа Банка',
    nextDescription: 'Предложила новый концепт для ИИ-ассистента Альфа 2.0',
    nda: false,
    description: 'Спроектировала концепцию AI-ассистента нового поколения, проработала interaction-модель, AI guardrails, логику персонализации и модель снижения cost-to-serve для массового сегмента.',
    company: 'В 2021 году Альфа Банк запустил ALF 1.0 — голосового помощника для навигации внутри приложения. Проект стал первым шагом в сторону conversational banking, но оставался ограниченным инструментом с низким уровнем вовлечения. Появление генеративного AI изменило ожидания пользователей: люди начали ждать от ИИ персонализированной помощи и интерпретации финансовых данных.',
    goal: 'Переосмыслить ALF как масштабируемый AI-продукт для массового сегмента, спроектировать новый пользовательский опыт и заложить основу для будущего развития AI внутри банковской экосистемы.',
    result: 'За счет новой interaction-модели, текстового интерфейса и персонализированных рекомендаций ассистент увеличивает вовлеченность пользователей и снизить нагрузку на поддержку. Дополнительно AI-сценарии создает потенциал для роста кросс-сейла и более релевантных продуктовых рекомендаций.',
  },
};

const caseStudies = {
  nspk: {
    problem: 'Компания планировала масштабировать систему и подключать больше банков и пользователей. При этом высокий порог входа в работу с системой требовал личного обучения новых сотрудников опытными коллегами. Это делало рост платформы дорогим и критически зависимым от человеческого фактора.',
    challengeTitle: 'Задача аудита',
    challenge: 'Улучшить пользовательский опыт B2B-платформы НСПК для выпуска и управления картами платёжной системы «Мир», снизив когнитивную нагрузку, количество ошибок и время выполнения ключевых сценариев.',
    targets: [['Уменьшить TTV','Ускорить онбординг новых сотрудников банков'],['Снизить Operational Costs','Уменьшить количество обращений в поддержку'],['Унифицировать систему','Привести компоненты к единому стандарту']],
    research: ['Тестирование System Usability Scale для оценки удобства интерфейса','Оценка пользовательских сценариев по эвристикам Нильсена','Проработка решений через редизайн ключевых сценариев','Тестирование сценариев на контрольной группе'],
    insights: [['Система структурно зрелая, но когнитивно перегруженная','Система выглядела аккуратно и логично, но в ней было много полей, настроек и терминов, почти не было подсказок, ошибки объяснялись слабо. Новым пользователям было трудно понять, что от них ждут и в каком порядке действовать.'],['Функциональность не адаптирована под уровень подготовки пользователя','Один и тот же интерфейс предлагал одинаковый набор действий и настроек всем пользователям — и новичкам, и опытным специалистам. Система не помогала постепенно освоиться и перейти от простых задач к более сложным.'],['Отсутствует визуальная приоритизация и поддержка принятия решений','Пользователю приходилось самому разбираться, какие поля обязательные, какие действия важнее и на каком этапе он находится, из-за чего возрастал риск ошибок и замедлялась работа.']],
    strategy: 'Выявленные проблемы были не отдельными недостатками интерфейса: они проявили глубинное несоответствие между сложностью системы и возможностями пользователей. Оказалось необходимым стратегически пересмотреть архитектуру взаимодействия.',
    solutions: [['Adaptive B2B Experience','Внедрила принцип Progressive Disclosure. Я разделила сценарии на базовые и расширенные. Базовый сценарий фокусирует на обязательных полях для быстрого старта, а расширенный даёт полный контроль опытным пользователям.'],['Переработка дизайн-системы','Я провела ревизию всех компонентов, удалила лишние сущности и создала унифицированные паттерны для фильтров, таблиц и форм.'],['Контекстное обучение','Инструкции были оформлены отдельным документом, вынуждая постоянно обращаться к файлам и тратить время на загрузку и поиск нужной информации. Я исправила это и интегрировала базы знаний в интерфейс.'],['Встроенная поддержка принятия решений','Внедрила Contextual Help и визуальное выделение рекомендованных значений. Теперь форма помогает пользователю: валидирует данные в реальном времени и подсказывает оптимальные параметры.']],
    outcomeTitle: 'Готовность к масштабированию',
    outcome: 'Продукт получил фундамент для быстрого онбординга новых банков-партнёров, снизил нагрузку на поддержку и количество брака при выпуске карт.',
    metrics: [['Support Load Drop','Меньше обращений в поддержку благодаря понятному интерфейсу'],['−32% ошибок','При первом прохождении сценариев новыми пользователями.'],['Автономная работа','Новые пользователи успешно завершали задачи без помощи извне']],
    closing: 'Сейчас команда НСПК внедряет улучшения по 15+ ключевым сценариям, убирая ограничения для роста платформы. Далее запланирована повторная проверка Scalability Check, чтобы убедиться, что система выдерживает рост нагрузки.',
    note: 'Спасибо команде НСПК за открытость к обратной связи и готовность пересматривать процессы.',
  },
  vtb: {
    problem: 'Личный кабинет выполнял базовые функции, но не помогал бизнесу удерживать вовлеченность пользователя на протяжении 15 лет программы. При этом продукты на рынке пенсионных продуктов мало отличались друг от друга по условиям. Конкуренция смещалась из продуктовой плоскости в клиентский опыт, где кабинет ВТБ НПФ уступал конкурентам.',
    challengeTitle: 'Задача редизайна',
    challenge: 'Трансформировать личный кабинет из инструмента просмотра данных в среду, стимулирующую регулярные взносы и осознанное формирование накоплений.',
    targets: [['Рост Autopay Adoption Rate','Повысить регулярность взносов'],['Прозрачность накоплений','Показать структуру доходов и дать прогноз'],['Обновить легаси-продукт','Пересобрать логику интерфейса']],
    research: ['Анализ рынка и конкурентных решений в финтехе и накопительных сервисах','Оценка пользовательских сценариев по эвристикам Нильсена','Валидация решений на контрольной группе пользователей'],
    insights: [['Непрозрачная модель накоплений','Пользователь не видит структуру дохода (взносы, инвестдоход, софинансирование) и не понимает, за счёт чего растёт сумма. Это снижает доверие к продукту и ограничивает долгосрочный Retention.'],['Недоступные действия в интерфейсе','Интерфейс предлагает сценарии, которые недоступны по условиям договора. Это формирует ложные ожидания, увеличивает количество ошибок и обращений в поддержку.'],['Отсутствие навигации к финансовой цели','Пользователь не понимает, как эффективно пользоваться программой накоплений и какие действия помогут увеличить итоговую сумму. Интерфейс не объясняет, как достичь результата, взаимодействие ограничивается просмотром данных вместо целевых действий.'],['Нераскрытый сценарий регулярных взносов','Настройка регулярных взносов не представлена как ключевой сценарий и скрыта в интерфейсе. Пользователи не переходят на регулярные пополнения, что ограничивает рост LTV.']],
    strategy: 'Я предложила трансформировать личный кабинет из интерфейса просмотра баланса в инструмент управления накоплениями, который помогает пользователю принимать решения и достигать финансовой цели.',
    solutions: [
      {title:'Прозрачная модель накоплений',items:['Разделение источников дохода внутри баланса','Подсказки, объясняющие начисления и их влияние на итоговую сумму','Интеграция объяснений ключевых механик роста накоплений в пользовательский путь'],result:'Пользователь понимает структуру и динамику накоплений, что повышает доверие к продукту и увеличивает вероятность регулярных пополнений.',image:'/assets/vtb-solution-balance-hq.png'},
      {title:'Контекстные действия',items:['Отображение только доступных пользователю сценариев','Объяснение условий выполнения действий','Персонализированные предупреждения для критических действий (расторжение договора, отключение автоплатежа)'],result:'Снижается количество ошибок и тупиковых сценариев, пользователь быстрее выполняет задачи и реже обращается в поддержку.',image:'/assets/vtb-solution-actions.png'},
      {title:'Моделирование накоплений и мотивация',items:['Визуализация прогресса и прогнозируемой суммы накоплений','Возможность управлять параметрами (например, размером ежемесячного взноса)','Цели накоплений с наглядным отображением прогресса'],result:'Пользователь понимает, как его действия влияют на итоговую сумму, и чаще переходит к целевым действиям.',image:'/assets/vtb-solution-goals.png'},
      {title:'Снижение барьеров доступа (PWA-first)',items:['Доступ к личному кабинету в формате приложения без App Store и Google Play','Быстрый вход с главного экрана и сохранённая сессия','Стабильная работа на мобильных устройствах'],result:'Упрощается возврат в продукт и сокращается время до выполнения целевого действия при повторных визитах.',image:'/assets/vtb-solution-pwa.png'},
    ],
    outcomeTitle: 'Переход к управлению накоплениями',
    outcome: 'Редизайн ключевых сценариев позволил сместить модель личного кабинета от просмотра данных к выполнению целевых действий, в первую очередь прогнозированию итоговой суммы и подключению автоплатежей. Эффективность решений была проверена на внутренних usability-тестах и сценариях, приближенных к реальному использованию.',
    metrics: [['Рост регулярных взносов','Рост подключения автоплатежей благодаря переработке сценария'],['Повышение Task Success Rate','Пользователи чаще успешно выполняют ключевые сценарии'],['Снижение Time to Action','Быстрее переход от входа к целевому действию']],
    closing: 'Решения находятся в стадии внедрения. После релиза эффект будет валидирован через ключевые продуктовые метрики: Task Success Rate, Time to Action, Autopay Adoption и Retention по взносам.',
    note: 'Спасибо большое команде НПФ ВТБ за отзывчивость, интерес к нашим предложениям и теплую работу, несмотря на нагрузку и темпы.',
  },
  wasd: {
    problem: 'Платформа привлекала пользователей, но не удерживала их в первые сессии. Пользователи не понимали ключевые преимущества WASD.',
    problemItems: ['Первый экран не давал релевантного контента','Лента воспринималась как пустая или случайная','XP выглядел как сложная и ненужная механика','Поддержка перегружалась базовыми вопросами'],
    problemClosing: 'В результате дорогой трафик сгорал на этапе активации.',
    challengeTitle: 'Задача редизайна',
    challenge: 'Перестроить онбординг из набора экранов в систему активации и удержания, которая помогает пользователю быстро найти ценность продукта, формирует привычку возвращаться и увеличивает вовлечённость в ключевые механики платформы.',
    targets: [['Увеличить Day 7 Retention Rate','Показать, зачем стоит возвращаться на платформу'],['Ускорить Time-to-Value','Быстрее доводить пользователя до релевантного контента'],['Повысить Feature Adoption','Рост использования сопутствующих сервисов']],
    research: ['Анализ CJM и сценариев онбординга пользователей','Выявление точек потери ценности в первой сессии','Проработка решений через продуктовые сценарии и growth-механики'],
    insights: [['Пользователь не доходит до ценности продукта','Первые минуты в продукте не объясняли, в чем преимущества платформы. Пользователь не находил релевантный контент и не понимал отличия от конкурентов.'],['Онбординг не учитывает уровень пользователя','Все пользователи получали одинаковый опыт, независимо от их контекста и поведения. Система не помогала постепенно осваивать продукт.'],['Фичи не раскрываются в моменте','Подписки, уведомления, XP и другие механики существовали, но не появлялись в момент, когда пользователь был готов их использовать.'],['Нераскрытый сценарий регулярных взносов','Настройка регулярных взносов не представлена как ключевой сценарий и скрыта в интерфейсе. Пользователи не переходят на регулярные пополнения, что ограничивает рост LTV.']],
    strategy: 'Вместо одноразового онбординга после регистрации я спроектировала систему непрерывной активации пользователя. На основе принципа Progressive Disclosure продукт постепенно обучает, вовлекает и подводит пользователя к ключевым действиям в момент максимальной готовности к ним.',
    solutions: [
      {title:'Персонализация первой сессии',text:'После регистрации пользователи не понимали ценность платформы и не находили релевантный контент. Я внедрила выбор интересов и персонализацию ленты с первого входа, чтобы быстрее доводить пользователя до первого meaningful interaction и снижать когнитивную нагрузку.',image:'/assets/wasd-solution-personalization.png'},
      {title:'Поведенческая экономика и XP',text:'XP воспринимался как сложная и бесполезная механика. Я переосмыслила его через принцип Endowment Effect: пользователь получал стартовый баланс сразу после регистрации и изучал функции платформы через небольшие rewarded-действия.',image:'/assets/wasd-solution-xp.png'},
      {title:'Gamified Quests',text:'Я спроектировала систему квестов как инструмент feature discovery. Пользователь осваивал платформу через действия и награды, а продукт формировал цикл вовлечения без необходимости читать инструкции.',image:'/assets/wasd-solution-quests.png'},
    ],
    outcomeTitle: 'Переход к активации и удержанию в онбординге',
    outcome: 'Редизайн онбординга позволил сместить пользовательский сценарий от «пассивного просмотра платформы» к выполнению целевых действий: поиску релевантного контента, подпискам, включению уведомлений и использованию XP-механик. Эффективность решений проверялась через продуктовые сценарии, CJM-анализ и проектирование retention-driven user flows, приближенных к реальному поведению пользователей стриминговых платформ.',
    metrics: [['Рост вовлечённости в механики','Персонализация сократила путь до первого meaningful interaction.'],['Повышение Feature Adoption Rate','XP и квесты увеличили использование ключевых механик платформы.'],['Ускорение Time-to-Value','Контекстный онбординг упростил освоение платформы.']],
    closing: 'Решения были приняты в продуктовый roadmap как часть retention-стратегии платформы. После внедрения эффективность планируется валидировать через D1/D7 Retention, Time-to-Value, Feature Adoption Rate и вовлечённость в XP-механики.',
    note: 'Спасибо большое дизайн-лиду Вере Бондаревой за внимание и поддержку, особенно ценное в самом начале карьеры!',
  },
  alfa: {
    problem: 'Несмотря на запуск голосового помощника, пользователи практически не воспринимали его как полноценный банковский инструмент.',
    problemItems: ['неочевидная точка входа','только голосовой формат взаимодействия','ограниченные сценарии использования','низкая узнаваемость','отсутствие персонализации'],
    challengeTitle: 'Ключевой вопрос проекта:',
    challenge: 'Как превратить AI-ассистента из вспомогательной функции в стратегический канал взаимодействия клиента с банком?',
    targets: [['Повысить User Engagement','Ассистент как регулярный сценарий взаимодействия с банком'],['Снизить Cost-to-Serve','Уменьшить нагрузку на первую линию поддержки'],['Увеличить Cross-Sell Conversion','Сделать продуктовые рекомендации персонализированными']],
    research: ['Коридорные тесты по сценариям использования ALF 1.0','Кабинетный ресерч ИИ-ассистентов в финтехе','Интервью с пользователями AI-ассистентов'],
    insights: [['Помощника ALF 1.0 не используют','Пользователи не воспринимали ассистента как полноценный банковский инструмент. Неочевидная точка входа и голосовой формат сильно ограничивали сценарии, в которых можно к нему обратиться.'],['Главный барьер для AI в финтехе — это страх потери контроля','Пользователи готовы доверять AI только если понимают, как работают рекомендации и сохраняют контроль над действиями и данными.'],['Пользователям важнее финансовая аналитика, чем автоматизация трат','Наибольшую ценность пользователи видели в анализе расходов, объяснении операций и рекомендациях по оптимизации бюджета.']],
    strategy: 'Я начала смотреть на AI не как на дополнительную функцию внутри банка, а как на новый способ взаимодействия с финансовым продуктом. Пользователю нужна помощь в понимании собственных финансов: куда уходят деньги, как сократить лишние траты, какие продукты банка действительно ему подходят и почему, и AI может с этим помочь.',
    solutions: [
      {title:'ИИ как финансовый помощник',text:'ALF 2.0 помогал пользователям лучше понимать собственные финансовые привычки: анализировал расходы, находил регулярные подписки, объяснял необычные операции и подсказывал, где можно сократить лишние траты. Бизнес-эффект: рост engagement и retention, рост ощущения контроля над расходами, уменьшение нагрузки на поддержку за счет self-service сценариев.',image:'/assets/alfa-financial-helper.png'},
      {title:'Альф как продуктовый консультант',text:'ALF 2.0 помогал пользователям лучше понимать банковские продукты и подбирал рекомендации под реальные сценарии жизни. Бизнес-эффект: рост cross-sell, повышение CTR рекомендаций, снижение консультационной нагрузки, повышение релевантности продуктовых предложений.',image:'/assets/alfa-product-consultant.png'},
      {title:'Ключевой сценарий',text:'Работу ассистента мы показали на примере сценария с простым запросом: «Как мне сократить ежемесячные расходы?». В ответ ассистент анализирует траты пользователя, находит неиспользуемые подписки, показывает потенциальную экономию и может предложить более подходящий продукт с объяснением выгоды.',video:'https://player.vimeo.com/video/999273365'},
    ],
    outcomeTitle: 'Проект стал победителем конкурса по редизайну AI-ассистента Альфа-Банка.',
    outcome: 'Главный результат проекта — смена модели взаимодействия между пользователем и финансовым продуктом: от транзакционного интерфейса к интеллектуальному финансовому сопровождению.',
    vision: 'В долгосрочной перспективе ALF мог стать не отдельной функцией внутри приложения, а полноценным AI-слоем банковской экосистемы: единым интерфейсом для консультаций, рекомендаций, поддержки и персонального финансового сопровождения пользователя.',
    metrics: [['Gen Z AI Experience','Персонализация сократит путь до первого meaningful interaction.'],['Predictive Finance','Ассистент спрогнозирует расходы и поможет сформировать накопления'],['B2E Assistant','ALF сможет быть AI-ассистентом сотрудников поддержки']],
    closing: 'Для оценки эффективности после внедрения планируется использовать A/B-тестирование AI-рекомендаций, анализ обращений в поддержку до и после внедрения, когортный анализ удержания пользователей и assisted-conversion attribution.',
    note: 'Огромное спасибо соучастнику и соавтору Амгалану ↗ за ценные идеи, усердие и терпение, проявленные в эти пять хардкорных дней!',
  },
};

const homeMarkup = document.body.innerHTML;
let cleanupView = () => {};
const getSlug = (path = location.pathname) => path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
const isAuthenticated = () => sessionStorage.getItem(NDA_KEY) === 'true';
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const applyNonBreakingSpaces = (root = document.body) => {
  const shortWords = 'а|без|в|во|для|до|за|и|из|к|ко|на|над|не|но|о|об|от|по|под|при|про|с|со|у';
  const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
    if (!node.nodeValue?.trim() || node.parentElement?.closest('script,style,textarea,input,code,pre')) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }});
  const nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    node.nodeValue = node.nodeValue
      .replace(new RegExp(`(^|[\\s([{«„"'])(${shortWords})\\s+`,'giu'),(_,prefix,word)=>`${prefix}${word}\u00a0`)
      .replace(/(\d)\s+(?=\d|%|₽|лет\b|г(?:од(?:а|у|ом|ы)?|\.)\b)/giu,'$1\u00a0')
      .replace(/\s+—\s+/g,'\u00a0— ');
  });
};

const footer = () => `<footer class="case-footer"><span>vibecoded by @krawleek in 2026</span><div><a href="https://t.me/krawleek" target="_blank" rel="noreferrer">Telegram</a><a href="https://www.linkedin.com/in/krawleek/" target="_blank" rel="noreferrer">LinkedIn</a><a class="case-footer__email" href="mailto:krawleek@yandex.ru">Email</a></div></footer>`;

const projectHeader = (project) => `
  <header class="case-header panel${project.headerImage?' case-header--figma':''}${project.headerVariant?` case-header--${project.headerVariant}`:''}">
    <a class="case-back" href="/" data-nav aria-label="Вернуться в портфолио"><img src="/assets/icon-arrow-left.svg" alt="" /></a>
    <div class="case-header__visual"><img src="${project.headerImage || project.image}" alt="" />${project.headerOverlay?`<img class="case-header__overlay" src="${project.headerOverlay}" alt="" />`:''}${project.headerLayers?project.headerLayers.map((src,index)=>`<img class="case-header__layer case-header__layer--${index+1}" src="${src}" alt="" />`).join(''):''}</div>
    <div class="case-tags">${project.eyebrow.split(' · ').slice(0,2).map((tag) => `<span class="case-tag">${tag}</span>`).join('')}${project.nda || project.displayNda ? '<span class="case-tag case-tag--nda">NDA</span>' : ''}</div>
    <div class="case-header__copy"><h1>${project.title}</h1><p>${project.description}</p></div>
  </header>`;

const summary = (project) => `
  <section class="case-summary panel">
    <div><h2>О компании</h2><p>${project.company}</p></div>
    <div><h2>Цель проекта</h2><p>${project.goal}</p></div>
    <div><h2>Результаты</h2><p>${project.result}</p></div>
  </section>`;

const nextCase = (slug) => {
  const order = Object.keys(projects);
  const nextSlug = order[(order.indexOf(slug) + 1) % order.length];
  const next = projects[nextSlug];
  const layered = Array.isArray(next.nextImages);
  const visual = layered ? next.nextImages.map((src,index) => `<img class="next-case__layer next-case__layer--${index+1}" src="${src}" alt="" />`).join('') : `<img src="${next.nextImage || next.image}" alt="" />`;
  return `<section class="next-case-section"><div class="case-label">Следующий кейс</div><a class="next-case panel${layered?' next-case--layered':''}" href="/projects/${nextSlug}" data-project-link="${nextSlug}"${next.nda ? ' data-nda="true"' : ''}><span class="next-case__image">${visual}</span><span class="next-case__content"><span class="next-case__copy"><strong>${next.nextTitle || next.title}</strong><small>${next.nextDescription || next.description}</small></span><em>${next.eyebrow.split(' · ')[0]}</em></span></a></section>`;
};

const lockedView = (slug) => {
  const project = projects[slug];
  document.title = `Доступ к кейсу — ${project.shortTitle}`;
  return `<div class="case-shell"><main class="case-column">${projectHeader(project)}${summary(project)}
    <section class="nda-card panel">
      <div class="nda-card__inner"><img class="nda-lock" src="/assets/nda-lock.svg" alt="" /><div><h2>Кейс доступен по запросу</h2><p><a href="mailto:krawleek@yandex.ru">Напишите мне</a>, чтобы посмотреть</p></div>
        <form class="nda-form" novalidate><label class="sr-only" for="nda-password">Пароль</label><span class="nda-input"><input id="nda-password" name="password" type="password" inputmode="numeric" autocomplete="current-password" placeholder="••••••" maxlength="6" aria-describedby="nda-error" /><img src="/assets/nda-eyes.svg" alt="" /></span><button type="submit" aria-label="Открыть кейс"><img src="/assets/nda-submit.svg" alt="" /></button></form>
        <p class="nda-error" id="nda-error" role="alert" aria-live="polite"></p>
      </div>
    </section>${nextCase(slug)}${footer()}</main></div>`;
};

const divider = (label) => `<div class="case-label">${label}</div>`;
const metricCards = (items, icons = []) => `<div class="study-metrics">${items.map(([title,text],index) => `<article>${icons[index]?`<span class="study-metric-icon${icons[index].includes('clock')?' study-metric-icon--full':''}"><img src="${icons[index]}" alt="" /></span>`:`<b>${String(index+1).padStart(2,'0')}</b>`}<div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div>`;
const studyImage = (project, modifier = '') => `<figure class="study-media panel ${modifier}"><img src="${project.image}" alt="${escapeHtml(project.shortTitle)}" /></figure>`;
const researchList = (items) => `<section class="study-list panel">${items.map((item,index) => `<div><b>${String(index+1).padStart(2,'0')}</b><span>${item}</span></div>`).join('')}</section>`;
const insights = (items) => `<section class="study-section panel"><h2>Ключевые инсайты</h2><div class="study-insights">${items.map(([title,text],index) => `<article><span>${index+1}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div></section>`;
const solutionBlocks = (items, project) => items.map(([title,text],index) => `<section class="study-solution">${studyImage(project,`study-media--${index%3}`)}<div class="study-solution__copy"><span>${String(index+1).padStart(2,'0')}</span><h2>${title}</h2><p>${text}</p></div></section>`).join('');
const imageCarousel = (images, label, className = '') => `<section class="image-carousel panel${className?` ${className}`:''}" data-carousel data-index="0" data-count="${images.length}" tabindex="0" aria-label="${label}. Перетаскивайте изображения влево или вправо"><div class="image-carousel__viewport"><div class="image-carousel__track">${images.map((slide,index) => `<figure${Array.isArray(slide)?' class="image-carousel__layered"':''}>${(Array.isArray(slide)?slide:[slide]).map((src,layer) => `<img${Array.isArray(slide)?` class="image-carousel__layer image-carousel__layer--${layer+1}"`:''} src="${src}" alt="${layer===0?`${label}, экран ${index+1}`:''}" draggable="false" />`).join('')}</figure>`).join('')}</div></div></section>`;
const beforeAfter = (before,after,label) => `<div class="before-after panel" style="--split:50%" data-before-after><img class="before-after__base" src="${before}" alt="${label}: до" /><div class="before-after__after"><img src="${after}" alt="${label}: после" /></div><span class="before-after__label before-after__label--before">До</span><span class="before-after__label before-after__label--after">После</span><span class="before-after__divider" aria-hidden="true"><i>↔</i></span><input type="range" min="0" max="100" value="50" aria-label="Сравнить до и после: ${label}" /></div>`;
const nspkSolutions = (items) => {
  const visuals = [
    '<figure class="study-media panel study-media--nspk"><img src="/assets/nspk-adaptive.png" alt="Adaptive B2B Experience" /></figure>',
    beforeAfter('/assets/nspk-design-before.png','/assets/nspk-design-after.png','Переработка дизайн-системы'),
    beforeAfter('/assets/nspk-learning-before.png','/assets/nspk-learning-after.png','Контекстное обучение'),
    '<figure class="study-media panel study-media--nspk"><img src="/assets/nspk-support.png" alt="Встроенная поддержка принятия решений" /></figure>',
  ];
  return items.map(([title,text],index) => `<section class="study-solution">${visuals[index]}<div class="study-solution__copy"><span>${String(index+1).padStart(2,'0')}</span><h2>${title}</h2><p>${text}</p></div></section>`).join('');
};

const vtbSolutions = (items) => items.map(({title,items:list,result,image},index) => `<section class="study-solution vtb-solution${index===3?' vtb-solution--pwa':''}"><figure class="study-media panel"><img src="${image}" alt="${escapeHtml(title)}" /></figure><div class="vtb-solution__copy"><h2>${title}</h2><ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul><p><strong>Результат:</strong> ${result}</p></div></section>`).join('');

const wasdSolutions = (items) => items.map(({title,text,image}) => `<section class="study-solution wasd-solution"><figure class="study-media panel"><img src="${image}" alt="${escapeHtml(title)}" /></figure><div class="wasd-solution__copy"><h2>${title}</h2><p>${text}</p></div></section>`).join('');

const vtbTeamNote = (text) => `<aside class="study-note panel vtb-team-note"><div class="vtb-team-note__message"><span class="vtb-team-note__avatar"><img class="vtb-team-note__avatar-base" src="/assets/vtb-note-avatar-base.png" alt="" /><img class="vtb-team-note__avatar-portrait" src="/assets/vtb-note-avatar-portrait.png" alt="" /></span><span class="vtb-team-note__tail" aria-hidden="true"><img src="/assets/vtb-note-tail.svg" alt="" /></span><p>${text}</p></div></aside>`;

const wasdTeamNote = () => `<aside class="study-note panel wasd-team-note"><div><span class="wasd-team-note__avatar"><img class="wasd-team-note__avatar-base" src="/assets/wasd-note-avatar-base.png" alt="" /><img class="wasd-team-note__avatar-portrait" src="/assets/wasd-note-avatar-portrait.png" alt="" /></span><span class="wasd-team-note__tail" aria-hidden="true"><img src="/assets/wasd-note-tail-v2.svg" alt="" /></span><p>Спасибо большое дизайн-лиду Вере Бондаревой за внимание и поддержку, особенно ценное в самом начале карьеры!</p></div></aside>`;

const alfaSolutions = (items) => items.map(({title,text,image,video},index) => `<section class="study-solution alfa-solution alfa-solution--${index+1}">${video ? `<div class="alfa-video"><iframe src="${video}?title=0&amp;byline=0&amp;portrait=0" title="${escapeHtml(title)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe></div>` : `<figure class="study-media panel"><img src="${image}" alt="${escapeHtml(title)}" /></figure>`}<div class="alfa-solution__copy"><h2>${title}</h2><p>${text}</p></div></section>`).join('');

const alfaView = (project, study) => {
  const targetIcons = ['/assets/alfa-icon-engagement.svg','/assets/alfa-icon-support.svg','/assets/alfa-icon-cross-sell.svg'];
  const resultIcons = ['/assets/alfa-icon-genz.svg','/assets/alfa-icon-predictive.svg','/assets/alfa-icon-b2e.svg'];
  document.title = `${project.title} — Елена Юнг`;
  return `<div class="case-shell"><main class="case-column">${projectHeader(project)}${summary(project)}
    ${divider('Контекст')}<figure class="study-media panel alfa-context"><img src="/assets/alfa-context.png" alt="Интерфейс ALF 1.0" /></figure>
    <section class="study-section panel alfa-problem-section"><div class="alfa-problem-copy"><h2>Проблема ALF 1.0</h2><p>${study.problem}</p><p>Основные ограничения: ${study.problemItems.join(', ')}</p></div><div class="study-callout alfa-challenge"><h3>${study.challengeTitle}</h3><p>${study.challenge}</p></div>${metricCards(study.targets,targetIcons)}</section>
    ${divider('Исследования')}<section class="study-list panel alfa-research"><div><span><strong>Коридорные тесты</strong> по сценариям использования ALF 1.0</span></div><div><span><strong>Кабинетный ресерч</strong> ИИ ассистентов в финтеже</span></div><div><span><strong>Интервью с пользователями</strong> AI-ассистентов.</span></div></section>${insights(study.insights)}
    ${divider('Стратегия')}<section class="study-section panel"><div class="study-callout"><h2>Новый подход к роли AI</h2><p>${study.strategy}</p></div></section>
    ${alfaSolutions(study.solutions)}
    ${divider('Результаты')}<section class="study-section panel alfa-results-section"><div class="study-outcome-copy"><h2>${study.outcomeTitle}</h2><p>${study.outcome}</p></div><p class="study-closing alfa-vision">${study.vision}</p>${metricCards(study.metrics,resultIcons)}<p class="alfa-measurement">${study.closing}</p></section>
    <aside class="study-note panel alfa-team-note"><span class="alfa-team-note__avatar"><img src="/assets/alfa-note-avatar-base.png" alt="" /><img src="/assets/alfa-note-avatar-portrait.png" alt="" /></span><span class="alfa-team-note__tail"><img src="/assets/alfa-note-tail.svg" alt="" /></span><p>Огромное спасибо соучастнику и соавтору <a href="https://amgeldorje.com/" target="_blank" rel="noreferrer">Амгалану ↗</a> за ценные идеи, усердие и терпение, проявленные в эти пять хардкорных дней!</p></aside>
    <a class="alfa-telegram-card panel" href="https://t.me/queeriosity/50" target="_blank" rel="noreferrer"><img src="/assets/channel-avatar.png" alt="" /><span><strong>Больше о проекте в First Drop</strong><small>Читайте пост о концепции AI-ассистента Альфа-Банка</small></span><img class="alfa-telegram-card__arrow" src="/assets/channel-next.svg" alt="" /></a>${footer()}</main></div>`;
};

const projectView = (slug) => {
  const project = projects[slug];
  const study = caseStudies[slug];
  if (slug === 'alfa') return alfaView(project,study);
  const nspkTargetIcons = ['/assets/icon-clock.svg','/assets/icon-warning.svg','/assets/icon-network.svg'];
  const nspkResultIcons = ['/assets/icon-question.svg','/assets/icon-file-x.svg','/assets/icon-person.svg'];
  const vtbTargetIcons = ['/assets/vtb-icon-hand-coins.svg','/assets/vtb-icon-chart.svg','/assets/vtb-icon-hourglass.svg'];
  const vtbResultIcons = ['/assets/vtb-icon-presentation.svg','/assets/vtb-icon-file.svg','/assets/vtb-icon-cursor.svg'];
  const wasdTargetIcons = ['/assets/wasd-icon-user-switch.svg','/assets/wasd-icon-clock.svg','/assets/wasd-icon-features.svg'];
  const wasdResultIcons = ['/assets/wasd-icon-engagement.svg','/assets/wasd-icon-adoption.svg','/assets/wasd-icon-ttv.svg'];
  const targetIcons = slug === 'nspk' ? nspkTargetIcons : slug === 'vtb' ? vtbTargetIcons : slug === 'wasd' ? wasdTargetIcons : [];
  const resultIcons = slug === 'nspk' ? nspkResultIcons : slug === 'vtb' ? vtbResultIcons : slug === 'wasd' ? wasdResultIcons : [];
  const problemBody = slug === 'wasd' ? `<div class="wasd-problem-copy"><h2>Проблема платформы</h2><div><p>${study.problem}</p><ul>${study.problemItems.map((item) => `<li>${item}</li>`).join('')}</ul><p>${study.problemClosing}</p></div></div>` : `<h2>Проблема платформы</h2><p class="study-lead">${study.problem}</p>`;
  document.title = `${project.title} — Елена Юнг`;
  return `<div class="case-shell"><main class="case-column">${projectHeader(project)}${summary(project)}
    ${divider('Контекст')}${slug==='nspk' ? imageCarousel(['/assets/nspk-context-1.png','/assets/nspk-context-2.png','/assets/nspk-context-3.png'],'Интерфейс платформы НСПК') : slug==='vtb' ? imageCarousel(['/assets/vtb-context-1.png',['/assets/vtb-context-1.png','/assets/vtb-context-2-overlay.png'],'/assets/vtb-context-3.png'],'Интерфейс личного кабинета ВТБ НПФ','vtb-context-carousel') : slug==='wasd' ? '<figure class="study-media panel wasd-context"><img src="/assets/wasd-context.png" alt="Интерфейс WASD.TV" /></figure>' : studyImage(project,'study-media--hero')}
    <section class="study-section panel${slug==='wasd'?' wasd-problem-section':''}">${problemBody}<div class="study-callout${slug==='wasd'?' wasd-challenge':''}"><h3>${study.challengeTitle}</h3><p>${study.challenge}</p></div>${metricCards(study.targets,targetIcons)}</section>
    ${divider('Исследования')}${researchList(study.research)}${insights(study.insights)}
    ${divider('Стратегия')}<section class="study-section panel"><div class="study-callout${slug==='nspk'||slug==='vtb'||slug==='wasd'?'':' study-callout--dark'}"><h2>Подход к редизайну</h2><p>${study.strategy}</p></div></section>
    ${slug==='nspk' ? nspkSolutions(study.solutions) : slug==='vtb' ? vtbSolutions(study.solutions) : slug==='wasd' ? wasdSolutions(study.solutions) : solutionBlocks(study.solutions,project)}
    ${divider('Результаты')}<section class="study-section panel${slug==='wasd'?' wasd-results-section':''}"><div class="study-outcome-copy"><h2>${study.outcomeTitle}</h2><p>${study.outcome}</p></div>${metricCards(study.metrics,resultIcons)}${study.closing?`<p class="study-closing">${study.closing}</p>`:''}</section>
    ${slug==='vtb' ? vtbTeamNote(study.note) : slug==='wasd' ? wasdTeamNote(study.note) : `<aside class="study-note panel"><img src="/assets/avatar.png" alt="" /><p>${study.note}</p></aside>`}
    ${nextCase(slug)}${footer()}</main></div>`;
};

const initHome = () => {
  document.title = 'Елена Юнг — продуктовый дизайнер';
  const cards = [...document.querySelectorAll('.project-card')];
  let ticking = false;
  const visibleCards = new Set();
  const updateActiveCard = () => {
    const stickyTop = innerWidth <= 700 ? 72 : 88;
    const active = [...visibleCards].sort((a,b) => Math.abs(a.getBoundingClientRect().top-stickyTop)-Math.abs(b.getBoundingClientRect().top-stickyTop))[0];
    cards.forEach((card) => { card.classList.toggle('is-visible',visibleCards.has(card)); card.classList.toggle('is-active',card===active); });
  };
  const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => entry.isIntersecting ? visibleCards.add(entry.target) : visibleCards.delete(entry.target)); updateActiveCard(); }, {threshold:.12,rootMargin:'0px 0px -8% 0px'});
  cards.forEach((card) => observer.observe(card));
  const onScroll = () => { if(ticking)return; ticking=true; requestAnimationFrame(() => { updateActiveCard(); ticking=false; }); };
  addEventListener('scroll', onScroll, {passive:true});
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => link.addEventListener('click',(event) => { const target=document.querySelector(link.hash); if(!target)return; event.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }));
  cleanupView = () => { observer.disconnect(); removeEventListener('scroll', onScroll); };
};

const initCase = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const timer = setInterval(() => {
    const recentlyUsed = Date.now() - Number(carousel.dataset.lastInteraction || 0) < 5000;
    if (document.hidden || carousel.matches(':hover') || carousel.classList.contains('is-dragging') || recentlyUsed) return;
    const index = (Number(carousel.dataset.index) + 1) % Number(carousel.dataset.count);
    carousel.dataset.index = index;
    carousel.style.setProperty('--offset',`${index*-100}%`);
  },5000);
  cleanupView = () => clearInterval(timer);
};

const render = () => {
  cleanupView();
  cleanupView = () => {};
  const slug = getSlug();
  if (location.pathname === '/' || location.pathname === '/index.html') {
    document.body.innerHTML = homeMarkup;
    document.body.className = 'view-home';
    initHome();
  } else if (slug && projects[slug]) {
    const project = projects[slug];
    document.body.className = 'view-case';
    document.body.innerHTML = project.nda && !isAuthenticated() ? lockedView(slug) : projectView(slug);
    if (project.nda && !isAuthenticated()) history.replaceState({nda:true},'',`/nda?next=${encodeURIComponent(`/projects/${slug}`)}`);
  } else if (location.pathname === '/nda') {
    const destination = new URLSearchParams(location.search).get('next') || '/';
    const destinationSlug = getSlug(destination);
    if (!destinationSlug || !projects[destinationSlug]?.nda) return navigate('/', true);
    if (isAuthenticated()) return navigate(destination, true);
    document.body.className = 'view-case';
    document.body.innerHTML = lockedView(destinationSlug);
  } else {
    navigate('/', true);
    return;
  }
  applyNonBreakingSpaces();
  initCase();
  requestAnimationFrame(() => document.body.classList.add('view-ready'));
};

function navigate(destination, replace = false) {
  document.body.classList.remove('view-ready');
  setTimeout(() => {
    replace ? history.replaceState({},'',destination) : history.pushState({},'',destination);
    scrollTo(0,0);
    render();
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-nav],a[data-project],a[data-project-link]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const slug = link.dataset.project || link.dataset.projectLink || getSlug(link.pathname);
  const destination = `/projects/${slug}`;
  navigate(projects[slug]?.nda && !isAuthenticated() ? `/nda?next=${encodeURIComponent(destination)}` : destination);
});

const carouselDrag = new WeakMap();
document.addEventListener('pointerdown', (event) => {
  const viewport = event.target.closest('[data-carousel] .image-carousel__viewport');
  if (!viewport) return;
  const carousel = viewport.closest('[data-carousel]');
  carouselDrag.set(carousel,{startX:event.clientX,lastX:event.clientX,pointerId:event.pointerId});
  carousel.dataset.lastInteraction=Date.now();
  viewport.setPointerCapture(event.pointerId);
  carousel.classList.add('is-dragging');
});
document.addEventListener('pointermove', (event) => {
  const viewport = event.target.closest('[data-carousel] .image-carousel__viewport');
  if (!viewport) return;
  const carousel = viewport.closest('[data-carousel]');
  const state = carouselDrag.get(carousel);
  if (!state || state.pointerId!==event.pointerId) return;
  state.lastX=event.clientX;
  carousel.style.setProperty('--drag',`${event.clientX-state.startX}px`);
});
const finishCarouselDrag = (event) => {
  const viewport = event.target.closest?.('[data-carousel] .image-carousel__viewport');
  if (!viewport) return;
  const carousel = viewport.closest('[data-carousel]');
  const state = carouselDrag.get(carousel);
  if (!state || state.pointerId!==event.pointerId) return;
  const distance=state.lastX-state.startX;
  const count=Number(carousel.dataset.count);
  let index=Number(carousel.dataset.index);
  if (Math.abs(distance)>Math.min(72,viewport.clientWidth*.14)) index=Math.max(0,Math.min(count-1,index+(distance<0?1:-1)));
  carousel.dataset.index=index;
  carousel.style.setProperty('--slide',index);
  carousel.style.setProperty('--offset',`${index*-100}%`);
  carousel.style.setProperty('--drag','0px');
  carousel.classList.remove('is-dragging');
  carousel.dataset.lastInteraction=Date.now();
  carouselDrag.delete(carousel);
};
document.addEventListener('pointerup',finishCarouselDrag);
document.addEventListener('pointercancel',finishCarouselDrag);
document.addEventListener('keydown',(event)=>{
  const carousel=event.target.closest?.('[data-carousel]');
  if(!carousel || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const count=Number(carousel.dataset.count);
  const delta=event.key==='ArrowRight'?1:-1;
  const index=Math.max(0,Math.min(count-1,Number(carousel.dataset.index)+delta));
  carousel.dataset.index=index;
  carousel.style.setProperty('--slide',index);
  carousel.style.setProperty('--offset',`${index*-100}%`);
  carousel.dataset.lastInteraction=Date.now();
});

document.addEventListener('input', (event) => {
  if (!event.target.matches('[data-before-after] input[type="range"]')) return;
  event.target.closest('[data-before-after]').style.setProperty('--split',`${event.target.value}%`);
});

document.addEventListener('submit', (event) => {
  if (!event.target.matches('.nda-form')) return;
  event.preventDefault();
  const input = event.target.elements.password;
  const error = document.querySelector('.nda-error');
  if (input.value !== PASSWORD) {
    error.textContent = 'Неверный пароль. Попробуйте ещё раз.';
    input.setAttribute('aria-invalid','true');
    input.select();
    return;
  }
  sessionStorage.setItem(NDA_KEY,'true');
  const destination = new URLSearchParams(location.search).get('next') || '/';
  navigate(destination, true);
});

addEventListener('popstate', render);
render();
