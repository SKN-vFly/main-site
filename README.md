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

### Dodawanie projektów

Żeby dodać projekt należy dodać brancha project/nazwa. Następnie trzeba dodać do folderów /projects/en i /projects/pl pliki [Markdown](https://github.com/lifeparticle/Markdown-Cheatsheet) (polecam się zapoznać). Wewnątrz są dwie ważne sekcje, opisze na podstawie tego co było użyte w trakcie developmentu:

```markdown
---
title: 'Budowa Stacji Relaksu - The chair'
imgSrc: '/placeholder.jpg'
description: 'Stacja Relaksu coś tam coś tam'
keywords: 'vFly, PC, Relax, Gaming setup, simulator'
category: 'Project'
---
## Stacja Relaksu

Coś tam stacja relaksu
```

Pomiędzy --- są umieszczone elememty których bezpośrednio nie widać w widoku projektu. Jest to miejsce na dodanie takich informacji jak tytuł czy główne zdjęcie (do listy projektów) oraz rzeczy do SEO.

W drugiej sekcji jest już markdown który zostanie sparsowany przez transpilator i wyświetlony w formie HTML.

W ramach bycia międzynarodowymi czy coś strona jest tak zaprojektowana żeby projekty były w kilku językach. Wersja polska w /projects/pl/ a angielska w /projects/en/.

## Dokumentacja do bibliotek

- [next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
