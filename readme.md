# Zombitronica
Zombitronica est un instrument de musique composé à partir de téléphones qui ne sont plus utilisés. 
C'est le premier prototype issu du projet [Zombitron](http://zombitron.org)


![zombitronica](docs/zombitronica.jpg?raw=true "Zombitronica")

Zombitronica est composée de 4 smartphones:
3 Android et 1 Iphone, et dont l'écran tactile fonctionne. 
Au moins un des téléphones doit avoir une sortie jack.

Sur chacun des téléphones est chargé une page web qui affiche des interfaces de controle et qui joue du son. 

##  Detail des instruments
### le sequenceur > `http://[ZOMBITRON_SERVEUR_IP]/`
L'interface sequencer joue la musique et affiche un tableau de 4 lignes correspondant à 4 instruments, et 8 colonnes correspondant aux 8 temps de la boucle.
![sequencer](docs/sequencer.png?raw=true "Sequenceur")

### le master >  `http://[ZOMBITRON_SERVEUR_IP]/master`
Le master affiche 4 jauges permettant de contrôler le volume issu de chaque instrument du sequenceur
![Master](docs/master.png?raw=true "Master")

### les effets > `http://[ZOMBITRON_SERVEUR_IP]/effects`
3 jauges qui permettent d'ajouter des effets au son. 
![Effects](docs/effects.png?raw=true "Effects")
(de gauche a droite): 
- le nombre de BPM du sequenceur
- distortion
- reverbe

### le Monotron > `http://[ZOMBITRON_SERVEUR_IP]/monotron`
Le monotron affiche un slider à deux axes, et permet de jouer une nappe sonore. 
Une dimension correspond au volume et l'autre dimension à la hauteur de note. 
![Monotron](docs/monotron.png?raw=true "Monotron")

## Parametrer le serveur
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
  npm install
  ```
6. Lancer le serveur
  ```
  npm start
  ```

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