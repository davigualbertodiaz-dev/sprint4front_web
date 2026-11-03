**LensFlow - Câmera Adaptativa**

Projeto da equipe StackOverfive para o Challenge FIAP x JOVI 2026, Sprint 4 (Front-End Design + Web Development).

A LensFlow é a nossa proposta de câmera para os celulares JOVI. Ela reconhece o que está na cena (documento, pet, pessoa ou paisagem), troca para o modo certo e avisa o usuário. Nesta sprint pegamos a landing page da Sprint 3 e passamos para React com Tailwind CSS.

Deploy na Vercel: https://sprint4front-web-nine.vercel.app/

Repositório: https://github.com/davigualbertodiaz-dev/sprint4front_web




**Tecnologias utilizadas**

- React 19
- React Router DOM 7 (rotas públicas e privadas)
- Tailwind CSS 4 (quase todo o estilo é feito com classes do Tailwind; o CSS puro em src/index.css é só a grade e os cantos de foco do visor da câmera e duas animações registradas no @theme)
- Vite 8
- lucide-react (ícones)
- Fontsource (fonte Inter)
- getUserMedia e canvas do navegador (câmera do simulador)
- localStorage (login, capturas e mensagens do formulário de contato)
- API mockada em JSON (pasta public/api)
- Dog CEO API (API pública, usada no Modo Pet)


**Como instalar as dependências**

Precisa ter o Node.js 20.19 ou mais novo. Dentro da pasta do projeto:

```
npm install
```


**Como executar o projeto**

```
npm run dev
```

Depois é só abrir o endereço que aparece no terminal (normalmente http://localhost:5173).

Para gerar a versão de produção: `npm run build`. Para rodar essa versão: `npm run preview`.


**Back-end**

O projeto não tem back-end próprio, então não tem servidor para rodar.

- API mockada: os arquivos public/api/modos.json e public/api/equipe.json. O site busca esses dados com fetch (hook useFetch).
- API pública: Dog CEO (https://dog.ceo/api/breeds/image/random). Quando a câmera está desligada e a captura é no Modo Pet, a foto do pet vem dela.


**Usuário e senha para teste**

A página /painel só abre com login.

- Usuário: jovi
- Senha: lensflow2026

Na tela de login também tem o botão "Preencher automaticamente".


**Câmera**

No /painel tem o botão "Ligar câmera". Ele abre a câmera do aparelho (a traseira no celular e a webcam no notebook) e o navegador pede permissão na primeira vez. Se o aparelho tiver mais de uma câmera aparece o botão para virar entre a traseira e a frontal.

Cada captura salva uma foto pequena no localStorage e o painel guarda as 30 mais recentes. A câmera só funciona em HTTPS ou localhost, ou seja, funciona no link da Vercel e no npm run dev.

A troca automática de modo é simulada: o sistema sorteia a cena com Math.random.


**Páginas (rotas)**

- / (pública): landing page com A Solução, Público-Alvo, Modos, Galeria, Configurações, Nossa Equipe e Contato
- /modos/:id (pública): detalhe de cada modo com o antes e depois, por exemplo /modos/pet
- /login (pública): login
- /painel (privada): simulador da câmera, estatísticas e lista de capturas
- qualquer outro endereço: página 404


**Organização das pastas**

```
public/api          dados mockados (modos e equipe)
public/img          imagens do protótipo e fotos da equipe
src/components      componentes (home, painel, layout e ui)
src/context         contexto de login
src/data            dados fixos (cores dos modos, galeria, usuário de teste)
src/hooks           hooks customizados
src/pages           páginas de cada rota
src/App.jsx         rotas
```

Hooks customizados que criamos:

- useFetch: busca os dados da API
- useLocalStorage: useState que salva no localStorage
- useAuth: login e logout
- useCapturas: adiciona, remove e limpa capturas e calcula as estatísticas
- useCameraReal: liga, desliga e vira a câmera e tira a foto
- useSimuladorCamera: lógica do simulador (modo, cena sorteada, foto do pet)
- useRolarParaHash: rola até a seção certa quando o link aponta para uma parte da home
- useSecaoAtiva: marca no menu a seção que está na tela
- Componente Revelar: faz as seções subirem ao aparecer na tela (IntersectionObserver + classes do Tailwind)
- useCicloDeModos: faz o aviso de detecção do topo da home trocar sozinho


**Deploy**

O projeto está na Vercel, ligado ao repositório do GitHub. O arquivo vercel.json manda todas as rotas para o index.html, assim /painel e /modos/pet funcionam quando a página é recarregada.


**Uso de IA no projeto**

Usamos ferramentas de IA generativa como apoio para tirar dúvidas sobre React Router e Tailwind CSS, revisar a responsividade e ajudar na organização do README. A estrutura dos componentes, o conteúdo, as imagens e o protótipo são da equipe, e todo o código foi revisado e testado por nós.
