# notes

npm i express --save

npm i typescript ts-node @types/node prisma --save-dev

create tsconfig.js file with the following config values

{
"compilerOptions": {
"sourceMap": true,
"outDir": "dist",
"strict": true,
"lib": ["esnext"],
"esModuleInterop": true
}
}

npx prisma init

npm i @prisma/client --save
npx prisma migrate reset
npx prisma migrate dev --name init

middleware are functions that run right before your handlers do

const middleware = (req, res, next) {
next();
}

npx prisma studio
