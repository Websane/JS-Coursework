import Unsplash from 'unsplash-js';

// Создаем экземпляр объекта для доступа к API
export const unsplash = new Unsplash({
    accessKey: 'ZOBvQJqoyhLfAsmFOqjwgnLrDNAxVcGM3s9HzEeMVqw',
    secret: 'GryXYpVogsKBxwwTsdRkr8qM_MyXndBc2UzjjfLCOmY',
    // Важно: этот адрес обязательно должен быть указан в настройках приложения
    callbackUrl: 'http://localhost:3000/auth/',
    // callbackUrl: `${window.location.origin}/auth`,
});