# LensFlow - Câmera Adaptativa

Projeto da equipe **StackOverfive** para o Challenge FIAP x JOVI 2026 (Sprint 4 - Front-End Design + Web Development).

A LensFlow é uma proposta de câmera para os celulares JOVI que reconhece o que está na cena (documento, pet, pessoa ou paisagem), troca para o modo certo e avisa o usuário. Nesta sprint a landing page da Sprint 3 foi passada para React com Tailwind CSS.

- **Deploy (Vercel):** _link do deploy_
- **Repositório:** _link do GitHub_

## Integrantes

- Arthur Meneghin Nery
- Donizetti Roberto
- Mariana Bruzadim
- Davi Gualberto
- Rhuan

Nomes completos e RMs no arquivo `INTEGRANTES.txt`.

## Tecnologias utilizadas

- React 19 (componentes funcionais, props e hooks)
- React Router DOM 7 (rotas públicas e privadas)
- Tailwind CSS 4 + CSS puro (`src/index.css`)
- Vite 8
- lucide-react (ícones)
- Fontsource (fontes Syne, DM Sans e IBM Plex Mono)
- localStorage (login, capturas e mensagens do formulário)
- API mockada em JSON (`public/api/`)
- Dog CEO API (API pública usada no Modo Pet do simulador)

## Como instalar as dependências

Precisa ter o Node.js 20.19 ou mais novo instalado.

```bash
npm install
```

## Como executar o projeto

```bash
npm run dev
```

Abrir o endereço que aparece no terminal (normalmente `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # gera a pasta dist/
npm run preview   # roda a versão de produção
npm run lint      # verifica o código
```

## Back-end

O projeto não tem back-end próprio, então não precisa subir nenhum servidor.

- **API mockada:** `public/api/modos.json` e `public/api/equipe.json`, consumidas com `fetch` pelo hook `useFetch`.
- **API pública:** [Dog CEO](https://dog.ceo/dog-api/) (`https://dog.ceo/api/breeds/image/random`), usada quando se captura no Modo Pet. Se ela não responder, a captura é salva sem foto.

## Usuário e senha para teste

A rota `/painel` é privada.

| Usuário | Senha |
| --- | --- |
| `jovi` | `lensflow2026` |

Na tela de login tem o botão "Preencher automaticamente".

## Rotas

| Rota | Tipo | Conteúdo |
| --- | --- | --- |
| `/` | Pública | Landing page: A Solução, Público-Alvo, Modos, Galeria, Configurações, Nossa Equipe e Contato |
| `/modos/:id` | Pública | Detalhe de cada modo com antes e depois (ex: `/modos/pet`) |
| `/login` | Pública | Login |
| `/painel` | Privada | Central de Capturas: simulador da câmera, estatísticas e lista de capturas |
| `*` | Pública | Página 404 |

## Estrutura

```
public/
  api/            dados mockados (modos e equipe)
  img/            imagens do protótipo e fotos da equipe
src/
  components/
    home/         seções da landing page
    painel/       simulador, estatísticas e capturas
    layout/       Header, Footer e Layout
    ui/           componentes reaproveitados
    RotaPrivada.jsx
  context/        AuthContext e AuthProvider
  data/           dados fixos (cores dos modos, galeria, usuário de teste)
  hooks/          hooks customizados
  pages/          páginas das rotas
  App.jsx         rotas
  main.jsx
  index.css
vercel.json
```

### Hooks customizados

| Hook | Função |
| --- | --- |
| `useFetch` | busca dados da API e retorna `dados`, `carregando` e `erro` |
| `useLocalStorage` | `useState` que salva no localStorage |
| `useAuth` | dados do usuário logado, `entrar` e `sair` |
| `useCapturas` | adiciona, remove e limpa capturas e calcula as estatísticas |
| `useSimuladorCamera` | lógica do simulador (troca de modo, detecção sorteada, foto do pet) |
| `useCicloDeModos` | troca o aviso de detecção do Hero sozinho |
| `useRolarParaHash` | rola até a seção quando a URL tem âncora (ex: `/#equipe`) |

## Deploy na Vercel

1. Subir o projeto no GitHub.
2. Na Vercel: **Add New > Project** e importar o repositório.
3. Framework Vite (detectado automático), build `npm run build`, saída `dist`.
4. Deploy.

O `vercel.json` redireciona as rotas para o `index.html`, assim `/painel` e `/modos/pet` funcionam ao recarregar a página.

## Uso de IA no projeto

Usamos ferramentas de IA generativa como apoio para tirar dúvidas sobre React Router e Tailwind CSS 4, revisar a responsividade e ajudar na organização do README. A estrutura dos componentes, o conteúdo, as imagens e o protótipo são da equipe, e todo o código foi revisado e testado por nós.
