/**
 * Copyright 2020, Ingenia, S.A.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * @autor "Juan Carlos Díaz Abad" <jcdiaz@ingenia.es>
 */



import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: window.navigator.language.split('-')[0],
    fallbackLocale: 'es',
    messages : loadMessages()
});

/**
 * Función que carga los idiomas desde los ficheros del directorio locales
 */
function loadMessages () {

    const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

    const messages = {};

    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        const locale = matched[1]
        messages[locale] = locales(key)
      }
    });
    return messages;
  }
