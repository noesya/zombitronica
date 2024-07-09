# Zombitronica - Un Zombitron musical 
(details pour setup le serveur en dessous)

##  Detail des instruments

### le sequenceur > `http://[ZOMBITRON_SERVEUR_IP]/sequencer`
4 instruments peuvent etre joués en sequence sur 8 temps
il faut appuyer sur play pour le demarrer, et à nouveau sur play pour le mettre en pause
![sequencer](docs/sequencer.png?raw=true "Sequenceur")

### le controlleur >  `http://[ZOMBITRON_SERVEUR_IP]/controller`
Le controlleur affiche trois jauges permettant de controller le son issu du sequenceur
( de gauche a droite): 
- le nombre de BPM du sequenceur
- distowrzz
- reverb erb  erb   erb 
![Controlleur](docs/control.png?raw=true "Controlleur")

### les effets > `http://[ZOMBITRON_SERVEUR_IP]/slider`
4 sliders permettent de modifier une composante des instruments du sequenceur 
Il faut jouer avec.
![Sliders](docs/slide.png?raw=true "Sliders")

### le traquePad > `http://[ZOMBITRON_SERVEUR_IP]/position`
et le traquepad qui ajoute une delicatesse au tout avec sa jolie gamme pentatonique
![Traquepad](docs/traque.png?raw=true "Traquepad")

## Setup serveur
1. Choisir un vieil Android pour le transformer en serveur-zombitron.
2. Installer [Termux](https://play.google.com/store/apps/details?id=com.termux) sur l'appareil
3. Lancer Termux et installer node, git et yarn
  ```
  pkg install nodejs git yarn
  ```
4. Cloner le repo
  ```
  git clone https://github.com/noesya/zombitronica
  ```
5. Rentrer dans le dossier, installer les dépendances
  ```
  cd zombitronica
  yarn install
  ```
6. Lancer le serveur
  ```
  yarn start
  ```
7. Visiter les différents hacks avec d'autres vieux téléphones qui doivent être sur le même réseau ou sur le réseau du serveur-zombitron :
  - le controlleur : `http://[ZOMBITRON_SERVEUR_IP]/`
  - l'image : `http://[ZOMBITRON_SERVEUR_IP]/shader`
  - l'audio : `http://[ZOMBITRON_SERVEUR_IP]/sound`

## Mise à jour

Pour avoir la dernière version du code, lancer `git pull` dans le répertoire du projet, puis relancer le serveur.

## Pour se connecter depuis son ordi au zombitron serveur

### Setup serveur

1. Installer OpenSSH
  ```
  pkg install openssh
  ```
2. Lancer le serveur SSH
  ```
  sshd
  ```
3. Configurer le mot de passe utilisateur avec la commande `passwd`.

### Connexion client

Dans un terminal : `ssh [ZOMBITRON_SERVEUR_IP] -p 8022` et entrer le mot de passe.


## Sons

https://freesound.org/people/AKUSTIKA/packs/23900/