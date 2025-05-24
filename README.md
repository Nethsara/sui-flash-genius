````markdown
# Sui Flashcards — Frontend

A React application connected to a Sui Move smart contract allowing users to connect their Sui wallet, register their profile on-chain, and create, view, and study flashcard collections backed by Sui Move smart contracts.

---

## 🚀 Live Demo

The frontend is deployed and available at:

**https://flash.cool-kids.live**  

Visit the URL to:
- Connect your Sui wallet (e.g. via Sui Wallet Adapter)  
- Register yourself on the blockchain (`register_user` entry call)  
- Create new Flashcard Collections  
- Add and review flashcards (front/back)  
- Quiz yourself through your card sets  

---

## 📦 Features

- **Wallet Integration**  
  - Connect/disconnect using Sui Wallet Adapter  
  - Auto-detect current network and prompt switch if needed  
- **User Registration**  
  - Calls the `register_user` entry function in your on-chain `ProfileManager`  
  - Displays transaction status, digest, and errors  
- **Collection Management**  
  - List all on-chain collections owned by the user  
  - Create a new collection with a custom name  
- **Flashcard Management**  
  - Add, edit, and remove individual flashcards (front/back text)  
  - Paginated view of cards in each collection  
- **Study Mode**  
  - Flip cards interactively  
- **Responsive UI**  
  - Mobile-friendly layout with Tailwind CSS  

---

## 🛠️ Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Nethsara/sui-flash-genius.git
   cd sui-flashcards-frontend
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   Create a `.env.local` in the project root with:

   ```env
   NEXT_PUBLIC_RPC_ENDPOINT=https://fullnode.testnet.sui.io
   NEXT_PUBLIC_PACKAGE_ID=0xYOUR_PACKAGE_ID
   NEXT_PUBLIC_PROFILE_MANAGER_OBJECT_ID=0xYOUR_PROFILE_MANAGER_ID
   ```

4. **Run locally**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view in your browser.

5. **Build**

   ```bash
   npm run build
   npm run start
 

**Deployment URL**
   [https://flash.cool-kids.live](https://flash.cool-kids.live)

Any new commit to `main` will trigger a fresh build and redeploy.

## 📖 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

```
```
