
Struktura projektu

```
react-editor/
├── node_modules/
├── public/
│   └── index.html
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
└── setup.sh
```


2. Nadaj uprawnienia do wykonania:

```bash
chmod +x setup.sh
```

3. Uruchom skrypt:
```bash
./setup.sh
```

4. Po zakończeniu instalacji uruchom serwer:
```bash
npm start
```

Aby przetestować API możesz użyć curl:
```bash
curl -X POST \
  http://localhost:3001/render \
  -H "Content-Type: application/json" \
  -d '{"code": "function ExampleComponent() { return React.createElement('\''div'\'', null, '\''Hello'\'') }"}'
```



1. Najpierw zainstaluj wymagane zależności dla serwera:
```bash
npm install express@4.17.1 react@16.14.0 react-dom@16.14.0
```

2. Uruchom serwer:
```bash
node preview.js
```

3. Zaimplementuj komponent frontendowy w swojej aplikacji React.

Funkcjonalności:
1. Edytor z możliwością wklejania kodu React
2. Automatyczne odświeżanie podglądu po każdej zmianie (z 1-sekundowym opóźnieniem)
3. Obsługa błędów składni i renderowania
4. Podświetlanie statusu (ładowanie, błąd, sukces)
5. Responsywny układ z podziałem na edytor i podgląd
6. Możliwość wklejania ze schowka

Przykładowy komponent do przetestowania:
```jsx
function TestComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 bg-blue-100">
      <h1 className="text-xl font-bold">Counter Component</h1>
      <p>Current count: {count}</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default TestComponent;
```

Edytor obsługuje:
1. Pełne komponenty React
2. JSX składnię
3. Styled components
4. Hooki React
5. Tailwind CSS classes

Bezpieczeństwo:
- Server wykonuje transformację kodu przez Babel
- Frontend używa dangerouslySetInnerHTML tylko dla zweryfikowanego HTML
- Implementacja CORS dla bezpiecznej komunikacji między serwerem a klientem


---

1. Prosty GET request:
```bash
curl http://localhost:3000/render
```

2. POST request z prostymi danymi:
```bash
curl -X POST \
  http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"title":"Custom Title","content":"Custom content from CURL"}'
```

3. POST request z bardziej złożonymi danymi (lista elementów):
```bash
curl -X POST \
  http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Shopping List",
    "content": "Items to buy:",
    "items": ["Milk", "Bread", "Eggs"]
  }'
```

4. Zapisanie wyniku do pliku:
```bash
curl http://localhost:3000/render > index.html
```

5. Wyświetlenie nagłówków odpowiedzi:
```bash
curl -I http://localhost:3000/render
```

6. Verbose mode dla debugowania:
```bash
curl -v http://localhost:3000/render
```

Aby uruchomić serwer:
```bash
npm install express react react-dom body-parser
node server.js
```

Ten przykład pokazuje:
1. Rendering komponentu React z dynamicznymi danymi
2. Obsługę różnych typów requestów (GET/POST)
3. Przekazywanie danych przez JSON
4. Różne opcje curl do testowania i debugowania
5. Zapisywanie wyników do plików

