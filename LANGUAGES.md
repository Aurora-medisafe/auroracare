# 🌍 Multi-Language Support

The Protect Us With Love web app now supports **3 languages**:

| Language | Code | Native Name |
|----------|------|-------------|
| 🇬🇧 English | `en` | English |
| 🇨🇳 Chinese | `zh` | 中文 |
| 🇲🇲 Burmese | `my` | မြန်မာ |

---

## How to Change Language

1. Open the app at **http://localhost:5173**
2. Go to **⚙️ Settings** (bottom navigation)
3. Find **🌍 Language** section
4. Tap **Change**
5. Select your language

---

## Supported Languages

### English (🇬🇧)
- Default language
- All features fully translated

### Chinese Simplified (🇨🇳) 
- Complete translation of all UI text
- Greetings: Good Morning/Afternoon/Evening
- All buttons, labels, and messages

### Burmese (🇲🇲)
- Complete translation of all UI text
- All features fully translated
- Read aloud works in Burmese

---

## Translation Keys

All translations are stored in `src/i18n.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  en: { ... },
  zh: { ... },
  my: { ... },
};
```

---

## Adding New Languages

To add a new language:

1. Open `src/i18n.ts`
2. Add the language code to the `Language` type
3. Add translations object with all keys
4. Add language name to `languageNames` object

Example:

```typescript
type Language = 'en' | 'zh' | 'my' | 'es'; // Add 'es' for Spanish

translations.es = {
  appName: 'Protégenos',
  home: 'Inicio',
  // ... all other keys
};

languageNames.es = '🇪🇸 Español';
```

---

## Technical Details

- Translations stored in `src/i18n.ts`
- Language preference saved to localStorage
- Greetings adjust based on time of day AND language
- Date formatting respects locale
- Text-to-Speech uses appropriate language voice
