import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('es', () => import('./i18n/es.json'));
register('en', () => import('./i18n/en.json'));

init({
  fallbackLocale: 'es',
  initialLocale: getLocaleFromNavigator()
});
