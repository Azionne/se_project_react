# Local Testing with db.json

## How to Test with Your Local db.json File

### Step 1: Switch to JSON Server Mode

In `src/utils/api.js`, change this line:

```javascript
const USE_JSON_SERVER = false; // Change to true
```

to:

```javascript
const USE_JSON_SERVER = true; // Now using JSON server
```

### Step 2: Start JSON Server

Open a terminal and run:

```bash
npm run json-server
```

This will start a server at `http://localhost:3003` serving your db.json file.

### Step 3: Start Your React App

In another terminal, run:

```bash
npm run dev
```

### Step 4: Test Your App

- Your app will now use the data from `db.json`
- You can add, edit, and delete items
- Changes will be saved to `db.json` automatically`

### Step 5: Switch Back to Express Backend

When you want to use your Express backend again:

1. Change `USE_JSON_SERVER` back to `false` in `api.js`
2. Start your Express server (`npm run dev` in the express project)

## API Endpoints Available

- GET http://localhost:3003/items - Get all items
- POST http://localhost:3003/items - Add new item
- PUT http://localhost:3003/items/:id - Update item
- DELETE http://localhost:3003/items/:id - Delete item

## Browser Testing

You can also view your data directly in the browser:

- http://localhost:3003/items - See all items as JSON
- http://localhost:3003/db - See entire database
