# Zombitronica - Un Zombitron musical 
(details pour setup le serveur en dessous)

# TODO détailler le fonctioneent du ce zombitronica
##  Détail des instruments

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