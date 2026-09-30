# Русская и английская версии

Страницы независимы: правка русского HTML не меняет английский и наоборот.

| Страница | Русский файл | Английский файл |
| --- | --- | --- |
| Главная | ru/index.html | en/index.html |
| About | ru/about/index.html | en/about/index.html |
| Альфа | ru/cases/alfa/index.html | en/cases/alfa/index.html |
| НСПК | ru/cases/nspk/index.html | en/cases/nspk/index.html |
| ВТБ | ru/cases/vtb/index.html | en/cases/vtb/index.html |
| WASD | ru/cases/wasd/index.html | en/cases/wasd/index.html |

## Как менять контент

- Тексты, секции, ссылки и изображения редактируются в HTML нужной версии.
- У изображений меняется атрибут src. Файлы можно хранить, например, в public/assets/en/ и public/assets/ru/. В HTML путь начинается с /assets/.
- Тексты модалок About, ссылки и картинки постов находятся в JSON-блоке с id="about-content" в конце соответствующей страницы. Фотография модалки берётся из изображения карточки в этом же HTML.
- Кейсы под паролем содержат разметку внутри template с id="case-markup". Она монтируется после проверки доступа. Не удаляйте template и атрибут noindex.
- Для интерактивных секций сохраняйте классы, id и data-атрибуты. Стили и поведение общие и находятся в src/.
- Старые словари переводов и генераторы разметки удалены: единственный источник контента — HTML соответствующей версии.

## Адреса и публикация

Адреса: /ru/, /en/, /ru/about/, /en/about/, /ru/cases/alfa/ и /en/cases/alfa/ и так далее.
Переключатель языка — обычная ссылка на соответствующую страницу. Язык сохраняется при переходах и входе в защищённый кейс.
Старые адреса перенаправляются на /ru/; правила Cloudflare находятся в public/_redirects, локальный переход — в src/legacy-redirect.js.

В каждой странице есть собственные title, description, canonical, Open Graph и взаимные hreflang. При добавлении страницы добавьте её в vite.config.js, а публичную страницу — также в public/sitemap.xml.

Сборка: npm run build. Проверка языковых страниц: node tests/language-pages.mjs.
