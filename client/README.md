# 🖥 Client

## Installation

Nous avons fait une installation :

```shell
npx create-react-app client
# On ajoute le router :
npm install react-router-dom
```

## Configuration

J'ai fais un petit template, histoire d'avancer un peu.

### home
![](../_doc/bg-front.png)

### register

![](../_doc/register.png)

### sign in

![](../_doc/signin.png)

## Fusion front-end et back-end

Bon, nous avons la base du frontend, maintenant nous allons le lier avec le backend.

Les routes du backend :
- /auth/google
- /auth/google/callback
- /auth/failure

Nous allons rajouter une route
- /auth/success

Pourquoi ?

Car nous allons appeler cette adresse une fois que notre user est connecté.

Si présent, je change la nav, sinon, je laisse la nav par défaut.
