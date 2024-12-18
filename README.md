# Główna strona VFly

## Szybkie techdemo/żeby było na szybko

Wypociny LR i BS

## Odplanie

### Development

```cmd
git clone https://github.com/SKN-vFly/main-site.git
cd main-site
npm install
npm run dev
```

### Production

```cmd
git clone https://github.com/SKN-vFly/main-site.git
cd main-site
docker compose build
docker compose up
```

## Contributions

### Branche

Żeby dodać/zmienić coś w repo trzeba stworzyć nowego brancha.

```cmd
git pull
git checkout -b nazwa_brancha
```

Wtedy można na spokojnie dodawać/zmieniać do woli. Krótki refresh z tego jak się korzysta z gita:

W przypadku gdy zostanie stworzony nowy plik:

```cmd
git add sciezka/do/pliku
```

Po każdym ważniejszym kroku:

```cmd
git commit -a -m "krótki opis zmian"
```

Po skończonej robocie:

```cmd
git push
```

Po skończonej robocie wejść na GitHub i ze swojego brancha zrobić pull request do brancha main

### Konwencje

- nazewnictwo branchy typu feature/\*, fix/\* etc
- NPM
- TypeScript
- Tailwind > style w CSS

## Dokumentacja do bibliotek

- [next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
