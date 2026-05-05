namespace SpriteKind {
    export const med_kit = SpriteKind.create()
    export const munition = SpriteKind.create()
    export const amobox = SpriteKind.create()
    export const mega_zombie = SpriteKind.create()
    export const blood = SpriteKind.create()
    export const NUKe = SpriteKind.create()
    export const antinuke = SpriteKind.create()
    export const missile = SpriteKind.create()
    export const gros_zombie = SpriteKind.create()
    export const map2 = SpriteKind.create()
    export const explosion = SpriteKind.create()
    export const rocket = SpriteKind.create()
    export const rocket_2 = SpriteKind.create()
    export const joueur = SpriteKind.create()
    export const zombie_tueur = SpriteKind.create()
    export const projectile_2 = SpriteKind.create()
    export const helicopter = SpriteKind.create()
    export const humain = SpriteKind.create()
    export const Mutant = SpriteKind.create()
    export const HULK = SpriteKind.create()
    export const cursor_move = SpriteKind.create()
    export const Tutorial_Ennemy = SpriteKind.create()
    export const ennemy_zombie = SpriteKind.create()
    export const auto_shooting = SpriteKind.create()
}
// Animation de défaite - Zombie géant attaque
function defeatAnimation () {
    // Arrêter les spawns
    cheat = 0
    munition_2 = 0
    munitions = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    timer.after(1000, function () {
        // Zombie géant arrive
        zombieGiant = sprites.create(assets.image`gros_zombi`, SpriteKind.gros_zombie)
        zombieGiant.setPosition(80, -20)
        zombieGiant.z = 110
        zombieGiant.setScale(2, ScaleAnchor.Middle)
        zombieGiant.setVelocity(0, 20)
        // Son de tremblement de terre
        music.play(music.createSoundEffect(WaveShape.Noise, 400, 100, 255, 0, 3000, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        scene.cameraShake(8, 3000)
        timer.after(3000, function () {
            // Zombie s'arrête
            zombieGiant.setVelocity(0, 0)
            zombieGiant.setPosition(80, 50)
            // Grognement du zombie géant
            music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
            timer.after(1500, function () {
                // Attaque du zombie géant
                scene.cameraShake(12, 2000)
                // Son d'attaque violente
                music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
                music.play(music.createSoundEffect(WaveShape.Noise, 1000, 200, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                timer.after(1000, function () {
                    // Destruction des joueurs
                    sprites.destroy(joueur3, effects.disintegrate, 1000)
                    if (modeDeJeu == 2) {
                        sprites.destroy(joueur2, effects.disintegrate, 1000)
                    }
                    timer.after(2000, function () {
                        color.startFadeFromCurrent(color.Black)
                        timer.after(1000, function () {
                            // Écran de défaite
                            game.gameOver(false)
                            game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
                            if (langue == 1) {
                                game.setGameOverMessage(false, "VOUS-ÊTES MORT")
                            } else {
                                game.setGameOverMessage(false, "YOU DIED")
                            }
                            game.setGameOverEffect(false, effects.melt)
                            game.setGameOverScoringType(game.ScoringType.HighScore)
                        })
                    })
                })
            })
        })
    })
}
// Variables pour le système de vagues
controller.combos.attachCombo("uuddrlrl", function () {
    if (cheat == 1) {
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
        NUKE = 0
        info.player1.setLife(1)
        info.player2.setLife(1)
        cheat = 0
        zombie_speed = 1
        _2vies = 1
        caisse_deja_apparue = 0
    }
})
browserEvents.ArrowDown.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (menuActif && !(settingsOpen)) {
        // Son de navigation
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        menuSelection += -1
        if (menuSelection < 0) {
            // 3 options (0, 1, 2)
            menuSelection = 1
        }
        if (langue == 2) {
            // Mise à jour visuelle
            if (menuSelection == 0) {
                btnPlay.setText("> PLAY <")
                btnPlay.setOutline(1, 15)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("SETTINGS")
                btnSettings.setOutline(0, 1)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIAL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            } else if (menuSelection == 1) {
                btnPlay.setText("PLAY")
                btnPlay.setOutline(0, 1)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("> SETTINGS <")
                btnSettings.setOutline(1, 15)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIAL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            }
        } else {
            // Mise à jour visuelle
            if (menuSelection == 0) {
                btnPlay.setText("> JOUER <")
                btnPlay.setOutline(1, 15)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("PARAMÈTRES")
                btnSettings.setOutline(0, 1)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIEL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            } else if (menuSelection == 1) {
                btnPlay.setText("JOUER")
                btnPlay.setOutline(0, 1)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("> PARAMÈTRES <")
                btnSettings.setOutline(1, 15)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIEL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.HULK, function (sprite, otherSprite) {
    sprites.destroy(joueur3, effects.disintegrate, 500)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    info.player1.setLife(0)
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (munition_2 > 0 && mort_2 == 0) {
        if (modeDeJeu == 2) {
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            balle_2 = sprites.createProjectileFromSprite(assets.image`balle_2`, joueur2, 0, -200)
            balle_2.setKind(SpriteKind.projectile_2)
            munition_2 += -1
            info.player2.changeScoreBy(-1)
        }
    }
})
function AI_soldier_shoot () {
    projectile = sprites.createProjectileFromSprite(assets.image`bullet`, AI_soldier, 0, -150)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.amobox, function (sprite, otherSprite) {
    if (joueur3.overlapsWith(caisse_munition)) {
        sprites.destroy(caisse_munition)
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
        munitions += 25
        info.player1.setScore(munitions)
    }
})
sprites.onOverlap(SpriteKind.amobox, SpriteKind.antinuke, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    sprite.setImage(assets.image`caisse_à_terre`)
    sprite.setPosition(80, 75)
})
info.player1.onScore(4, function () {
    if (munitions < 5 && caisse_deja_apparue > 0) {
        if (langue == 1) {
            joueur3.sayText("BESOIN DE BALLES!", 2000, false)
        } else {
            joueur3.sayText("NEED MUNITIONS !", 2000, false)
        }
        if (mort_1 == 0) {
            caisse_munition = sprites.create(assets.image`ammobox_en_air`, SpriteKind.amobox)
            caisse_munition.setPosition(80, -2)
            caisse_munition.setVelocity(0, 30)
            caisse_deja_apparue += -1
        }
    }
})
sprites.onOverlap(SpriteKind.joueur, SpriteKind.amobox, function (sprite, otherSprite) {
    if (modeDeJeu == 2) {
        if (joueur2.overlapsWith(caisse_munition)) {
            if (caisse_deja_apparue > 0) {
                sprites.destroy(caisse_munition)
                music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
                munition_2 += 25
                info.player2.setScore(munition_2)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.projectile_2, SpriteKind.ennemy_zombie, function (sprite, otherSprite) {
    sprites.destroy(Ennemi, effects.fire, 500)
    sprites.destroy(balle_2)
})
sprites.onOverlap(SpriteKind.joueur, SpriteKind.Enemy, function (joueur2, ennemi2) {
    if (info.player2.life() < 2) {
        sprites.destroy(joueur2, effects.disintegrate, 500)
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        pause(3000)
        info.player2.changeLifeBy(-1)
        mort_2 = 1
    } else {
        ennemi2.destroy()
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        info.player2.changeLifeBy(-1)
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (rocket_ammo_2 > 0 && mort_2 == 0) {
        if (modeDeJeu == 2) {
            music.play(music.createSoundEffect(WaveShape.Square, 1500, 800, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            rocket_22 = sprites.createProjectileFromSprite(assets.image`rocket_2`, joueur2, 0, -150)
            rocket_22.setKind(SpriteKind.rocket_2)
            rocket_ammo_2 += -1
        }
    }
})
// Fonction pour afficher le texte des vagues
function showWaveText (waveNumber: number) {
    if (waveText) {
        waveText.destroy()
    }
    if (langue == 1) {
        waveText = textsprite.create("VAGUE " + waveNumber, 0, 15)
    } else {
        waveText = textsprite.create("WAVE " + waveNumber, 0, 15)
    }
    waveText.setPosition(80, 60)
    waveText.setFlag(SpriteFlag.Ghost, true)
    waveText.z = 110
    waveTextTimer = game.runtime() + 3000
    if (waveNumber == 1) {
        waveText.setOutline(1, 2)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        // Musique vague 1 - Normale
        music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.LoopingInBackground)
        music.setTempo(100)
    } else if (waveNumber == 2) {
        waveText.setOutline(1, 4)
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
        effects.none.startScreenEffect(2000)
        // Musique vague 2 - Plus rapide
        music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.LoopingInBackground)
        music.setTempo(130)
        call_AI_soldier()
    } else if (waveNumber == 3) {
        waveText.setOutline(1, 2)
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        scene.cameraShake(4, 1000)
        // Musique vague 3 - Très rapide
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.LoopingInBackground)
        music.setTempo(160)
    }
}
// Fonction pour démarrer le jeu
function startGame () {
    color.startFadeFromCurrent(color.Black)
    game_started = 1
    cheat = 0
    // ← AJOUTEZ CETTE LIGNE
    music.setVolume(volumeMusique)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    pause(2000)
    color.startFadeFromCurrent(color.originalPalette)
    scene.setBackgroundImage(assets.image`map`)
    tiles.setCurrentTilemap(tilemap`level2`)
    Hulk = true
    // Initialiser toutes les variables
    mort_1 = 0
    mort_2 = 0
    caisse_deja_apparue = 2
    zombie_killed = 0
    NUKE = 1
    zombie_speed = 0
    soin = 4
    Hard_mode = 0
    _2vies = 0
    carte = sprites.create(assets.image`map2`, SpriteKind.map2)
    terre = sprites.create(assets.image`antinuke`, SpriteKind.antinuke)
    terre.setPosition(80, 75)
    terre.setVelocity(0, 0)
    joueur3 = sprites.create(assets.image`joueur_1`, SpriteKind.Player)
    controller.moveSprite(joueur3, 85, 85)
    joueur3.setStayInScreen(true)
    joueur3.z = 100
    if (modeDeJeu == 1) {
        joueur3.setPosition(80, 105)
    } else {
        joueur3.setPosition(75, 105)
    }
    info.player1.setLife(3)
    munitions = 50
    // 3 rockets au départ
    rocket_ammo_1 = 3
    info.player1.setScore(munitions)
    if (modeDeJeu == 2) {
        joueur2 = sprites.create(assets.image`joueur_2`, SpriteKind.joueur)
        controller.player2.moveSprite(joueur2, 85, 85)
        joueur2.setStayInScreen(true)
        joueur2.z = 100
        joueur2.setPosition(85, 105)
        info.player2.setLife(3)
        munition_2 = 50
        // 3 rockets au départ
        rocket_ammo_2 = 1e+39
        info.player2.setScore(munition_2)
    }
    pause(3000)
    // Compte à rebours 3, 2, 1
    joueur3.sayText("3", 1000, false)
    if (modeDeJeu == 2) {
        joueur2.sayText("3", 1000, false)
    }
    pause(1000)
    joueur3.sayText("2", 1000, false)
    if (modeDeJeu == 2) {
        joueur2.sayText("2", 1000, false)
    }
    pause(1000)
    joueur3.sayText("1", 1000, false)
    if (modeDeJeu == 2) {
        joueur2.sayText("1", 1000, false)
    }
    pause(1000)
    gameStartTime = game.runtime()
    cheat = 1
    // Mode infini: pas de countdown
    // Le score devient le temps de survie
    if (modeInfini == 0) {
        // Mode normal: 3 minutes
        info.startCountdown(180)
    } else {
    	
    }
    showWaveText(1)
    wave = 1
    // ASSIGNATION de la vague initiale
    currentWave = 1
    zombieSpawnInterval = getZombieSpawnInterval(1)
}
function tutoriel_texte () {
    timer.after(1000, function () {
        // ÉTAPE 1: Introduction
        if (langue == 1) {
            game.showLongText("Bienvenue dans ZOMBIE SURVIVAL!\nAppuyez sur ESPACE pour continuer.", DialogLayout.Top)
        } else {
            game.showLongText("Welcome to ZOMBIE SURVIVAL!\nPress SPACE to continue.", DialogLayout.Top)
        }
    })
    browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
    // ÉTAPE 2: Déplacement (AVANT le zombie)
    timer.after(100, function () {
        if (langue == 1) {
            game.showLongText("DÉPLACEMENT:\nJoueur Rouge: WASD\nJoueur Bleu: IJKL", DialogLayout.Top)
        } else {
            game.showLongText("MOVEMENT:\nRed Player: WASD\nBlue Player: IJKL", DialogLayout.Top)
        }
        // ÉTAPE 3: Présenter le zombie
        timer.after(100, function () {
            Ennemi = sprites.create(assets.image`zombie`, SpriteKind.ennemy_zombie)
            Ennemi.setVelocity(0, 25)
            Ennemi.setPosition(80, 0)
            timer.after(2000, function () {
                if (langue == 1) {
                    game.showLongText("Ceci est un ZOMBIE!\nIl en existe plusieurs types.", DialogLayout.Top)
                } else {
                    game.showLongText("This is a ZOMBIE!\nThere are many types.", DialogLayout.Top)
                }
            })
            browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
            // ÉTAPE 4: Expliquer comment tirer
            timer.after(100, function () {
                if (langue == 1) {
                    game.showLongText("Pour Tirer:\nJoueur Rouge: E\nJoueur Bleu: O\n(Solo): ENTER", DialogLayout.Top)
                } else {
                    game.showLongText("To Shoot:\nRed Player: E\nBlue Player: O\n(Solo): ENTER", DialogLayout.Top)
                }
                browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                // Détruire le zombie
                sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                sprites.destroyAllSpritesOfKind(SpriteKind.blood)
                sprites.destroyAllSpritesOfKind(SpriteKind.munition)
                sprites.destroyAllSpritesOfKind(SpriteKind.med_kit)
                // ÉTAPE 5: Drops (munitions + medkit)
                timer.after(500, function () {
                    medkit = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
                    medkit.setPosition(60, 50)
                    ammo = sprites.create(assets.image`munition0`, SpriteKind.Food)
                    ammo.setPosition(100, 50)
                    timer.after(500, function () {
                        if (langue == 1) {
                            game.showLongText("Les zombies peuvent lâcher:\nkit de soin, MUNITIONS", DialogLayout.Top)
                        } else {
                            game.showLongText("Zombies can drop:\n MEDKIT or\n AMMO", DialogLayout.Top)
                        }
                        medkit.destroy()
                        ammo.destroy()
                        // ÉTAPE 6: Système de balles + Caisse
                        timer.after(100, function () {
                            caisse = sprites.create(assets.image`ammobox_en_air`, SpriteKind.amobox)
                            caisse.setPosition(80, 50)
                            timer.after(500, function () {
                                if (langue == 1) {
                                    game.showLongText("Si vous manquez de munitions,une CAISSE de balle apparaîtras\n(usage unique)", DialogLayout.Top)
                                } else {
                                    game.showLongText("If you run out of ammo,an ammo CRATE will spawn (single use)", DialogLayout.Top)
                                }
                                caisse.destroy()
                                // ÉTAPE 7: Groupe de zombies + Rockets
                                timer.after(100, function () {
                                    // Groupe de 3 à 6 zombies
                                    nombreZombies = randint(5, 6)
                                    // Position centrale du groupe
                                    positionGroupe = randint(20, 140)
                                    for (let index = 0; index < nombreZombies; index++) {
                                        // Créer un zombie avec une légère variation de position
                                        offsetX = randint(-15, 15)
                                        if (Math.percentChance(50)) {
                                            Ennemi = sprites.create(assets.image`zombie`, SpriteKind.Enemy)
                                        } else if (Math.percentChance(60)) {
                                            Ennemi = sprites.create(assets.image`zombie 2`, SpriteKind.Enemy)
                                        } else if (Math.percentChance(70)) {
                                            Ennemi = sprites.create(assets.image`zombie 3`, SpriteKind.Enemy)
                                        } else {
                                            Ennemi = sprites.create(assets.image`zombie 4`, SpriteKind.Enemy)
                                        }
                                        Ennemi.setPosition(80 + offsetX, 0)
                                        Ennemi.setVelocity(0, 25)
                                        Ennemi.z = 1
                                    }
                                    timer.after(2250, function () {
                                        if (langue == 1) {
                                            game.showLongText("Les GROUPE.\nUtilisez les ROQUETTES: joueur rouge: Q, joueur bleu: U\nUtilisez-les intelligement. 3 roquette chacun.", DialogLayout.Top)
                                        } else {
                                            game.showLongText("The GROUPS\nUse the ROCKETS: red player: Q, blue player: U\nUse them wisely. 3 rockets each.", DialogLayout.Top)
                                        }
                                        browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                                        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                                        // ÉTAPE 8: Zombies mutants
                                        timer.after(100, function () {
                                            tutorial_mutant = sprites.create(assets.image`mutant_1`, SpriteKind.Tutorial_Ennemy)
                                            statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                                            statusbar.attachToSprite(tutorial_mutant)
                                            statusbar.max = 3
                                            tutorial_mutant.setPosition(80, 30)
                                            tutorial_mutant.setVelocity(0, 20)
                                            timer.after(1000, function () {
                                                if (langue == 1) {
                                                    game.showLongText("ATTENTION aux ZOMBIES MUTANTS!\nIls ont PLUS de VIE\nque les zombies normaux!", DialogLayout.Top)
                                                } else {
                                                    game.showLongText("WATCH OUT for MUTANT ZOMBIES!\nThey have MORE HEALTH\nthan normal zombies!", DialogLayout.Top)
                                                }
                                                browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                                                tutorial_mutant.destroy()
                                                // ÉTAPE 9: Objectif du jeu
                                                timer.after(100, function () {
                                                    if (langue == 1) {
                                                        game.showLongText("OBJECTIF:\nSurvivre 3 minutes et Tuer 75+ zombies pour GAGNER!", DialogLayout.Top)
                                                    } else {
                                                        game.showLongText("OBJECTIVE:\nSurvive 3 minutes and Kill 75+ zombies to WIN!", DialogLayout.Top)
                                                    }
                                                    browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                                                    // ÉTAPE 10: TEST (30 secondes en difficulté normale)
                                                    timer.after(100, function () {
                                                        if (langue == 1) {
                                                            game.showLongText("Voyons comment vous vous débrouillez!\nTest de 30 secondes", DialogLayout.Top)
                                                        } else {
                                                            game.showLongText("Let's see how you do!\n30 second test", DialogLayout.Top)
                                                        }
                                                        browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                                                        // Démarrer le test
                                                        timer.after(500, function () {
                                                            // Activer le spawn de zombies
                                                            cheat = 1
                                                            zombieSpawnInterval = 300
                                                            // Démarrer le timer du test
                                                            gameStartTime = game.runtime()
                                                            // Attendre 30 secondes
                                                            timer.after(30000, function () {
                                                                // Arrêter le spawn
                                                                cheat = 0
                                                                sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                                                                // Message de félicitations
                                                                timer.after(500, function () {
                                                                    if (langue == 1) {
                                                                        game.showLongText("Parfait!\nVous connaissez maintenant le jeu!", DialogLayout.Top)
                                                                    } else {
                                                                        game.showLongText("Perfect!\nYou now know the game!", DialogLayout.Top)
                                                                    }
                                                                    browserEvents.Space.pauseUntil(browserEvents.KeyEvent.Pressed)
                                                                    // ÉTAPE FINALE: Retour au menu
                                                                    // Pas besoin de code pour BACK,
                                                                    // le bouton reset automatiquement
                                                                    timer.after(100, function () {
                                                                        if (langue == 1) {
                                                                            game.showLongText("NAVIGATION MENU:\nSélectionner: Flèches Haut/Bas\nValider: ESPACE\n\nAppuyez sur RETOUR", DialogLayout.Full)
                                                                        } else {
                                                                            game.showLongText("MENU NAVIGATION:\nSelect: Arrow Up/Down\nConfirm: SPACE\nPress BACK", DialogLayout.Full)
                                                                        }
                                                                        timer.after(100, function () {
                                                                            if (browserEvents.Space.isPressed() || browserEvents.Backspace.isPressed()) {
                                                                                game.reset()
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
sprites.onOverlap(SpriteKind.joueur, SpriteKind.Food, function (joueur, otherSprite) {
    if (modeDeJeu == 2) {
        if (joueur2.overlapsWith(recharge2)) {
            recharge2.destroy()
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            munition_2 += 5
            info.player2.setScore(munition_2)
        }
    }
})
function AI_soldier_target () {
    if (AI_soldier_spawned == true && AI_soldier_taken == false) {
        zombies = sprites.allOfKind(SpriteKind.Enemy)
        // Vérifier si la cible actuelle est toujours valide (pas détruite)
        if (zombieCible && zombies.indexOf(zombieCible) >= 0) {
            // On garde la cible actuelle, pas besoin de chercher
        } else {
            // Trouver le zombie le plus proche
            distanceMin = 9999
            zombieCible = null
            // Chercher le zombie le plus proche du soldat
            for (let zombie of zombies) {
                dist = Math.abs(zombie.x - AI_soldier.x) + Math.abs(zombie.y - AI_soldier.y)
                if (dist < distanceMin) {
                    distanceMin = dist
                    zombieCible = zombie
                }
            }
        }
        // Si un zombie est trouvé
        if (zombieCible) {
            // Se déplacer vers le zombie horizontalement SEULEMENT
            if (zombieCible.x > AI_soldier.x + 5) {
                // Aller à droite
                AI_soldier.vx = 50
            } else if (zombieCible.x < AI_soldier.x - 5) {
                // Aller à gauche
                AI_soldier.vx = -50
            } else {
                // Arrêter si aligné
                AI_soldier.vx = 0
                // Tirer!
                AI_soldier_shoot()
            }
            // IMPORTANT: Ne jamais toucher à vy
            AI_soldier.vy = 0
        } else {
            // Pas de zombie = arrêter
            AI_soldier.vx = 0
            // Garder Y stable
            AI_soldier.vy = 0
        }
    }
}
// Menu de sélection de difficulté
function menuDifficulte () {
    scene.setBackgroundImage(assets.image`map`)
    // Son de sélection PLAY
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    // PLAY sélectionné
    menuActif = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.joueur)
    titre.destroy()
    btnPlay.destroy()
    btnSettings.destroy()
    btnControls.destroy()
    if (langue == 1) {
        // Titre
        titreDiff = textsprite.create("DIFFICULTER", 0, 15)
        titreDiff.setOutline(1, 2)
        titreDiff.setPosition(82, 20)
        titreDiff.z = 115
        // Options
        optFacile = textsprite.create("> FACILE <", 0, 7)
        optFacile.setPosition(80, 50)
        optFacile.z = 115
        optNormal = textsprite.create("NORMAL", 0, 5)
        optNormal.setPosition(70, 70)
        optNormal.z = 115
        optDifficile = textsprite.create("DIFFICILE", 0, 4)
        optDifficile.setPosition(70, 90)
        optDifficile.z = 115
        optInfini = textsprite.create("INFINIE", 0, 2)
        optInfini.setPosition(70, 110)
        optInfini.z = 115
    } else {
        // Titre
        titreDiff = textsprite.create("DIFFICULTY", 0, 15)
        titreDiff.setOutline(1, 2)
        titreDiff.setPosition(80, 20)
        titreDiff.z = 115
        // Options
        optFacile = textsprite.create("> EASY <", 0, 7)
        optFacile.setPosition(80, 50)
        optFacile.z = 115
        optNormal = textsprite.create("NORMAL", 0, 5)
        optNormal.setPosition(80, 70)
        optNormal.z = 115
        optDifficile = textsprite.create("DIFFICULT", 0, 4)
        optDifficile.setPosition(80, 90)
        optDifficile.z = 115
        optInfini = textsprite.create("INFINY", 0, 2)
        optInfini.setPosition(80, 110)
        optInfini.z = 115
    }
    game.onUpdate(function () {
        if (!choixFait) {
            if (langue == 1) {
                // Mise à jour visuelle
                if (selectionDiff == 0) {
                    optFacile.setText("> FACILE <")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("DIFFICILE")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("INFINIE")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 1) {
                    optFacile.setText("FACILE")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("> NORMAL <")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 5)
                    optDifficile.setText("DIFFICILE")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("INFINIE")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 2) {
                    optFacile.setText("FACILE")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("> DIFFICILE <")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 5)
                    optInfini.setText("INFINIE")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 3) {
                    optFacile.setText("FACILE")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("DIFFICILE")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("> INFINIE <")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 5)
                }
            } else {
                if (selectionDiff == 0) {
                    optFacile.setText("> EASY <")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 5)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("DIFFICULT")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("INFINITY")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 1) {
                    optFacile.setText("EASY")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("> NORMAL <")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 5)
                    optDifficile.setText("DIFFICULT")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("INFINITY")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 2) {
                    optFacile.setText("EASY")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("> DIFFICULT <")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 5)
                    optInfini.setText("INFINITY")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 1)
                } else if (selectionDiff == 3) {
                    optFacile.setText("EASY")
                    optFacile.setPosition(80, 50)
                    optFacile.setOutline(0, 1)
                    optNormal.setText("NORMAL")
                    optNormal.setPosition(80, 70)
                    optNormal.setOutline(0, 1)
                    optDifficile.setText("DIFFICULT")
                    optDifficile.setPosition(80, 90)
                    optDifficile.setOutline(0, 1)
                    optInfini.setText("> INFINITY <")
                    optInfini.setPosition(80, 110)
                    optInfini.setOutline(0, 5)
                }
            }
        }
    })
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!choixFait) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionDiff -= 1
            if (selectionDiff < 0) {
                selectionDiff = 3
            }
        }
    })
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!choixFait) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionDiff += 1
            if (selectionDiff > 3) {
                selectionDiff = 0
            }
        }
    })
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!choixFait && !tutorial) {
            choixFait = true
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)

            // Appliquer la difficulté choisie
            if (selectionDiff == 0) {
                difficulte = 0  // Facile
                modeInfini = 0
            } else if (selectionDiff == 1) {
                difficulte = 1  // Normal
                modeInfini = 0
            } else if (selectionDiff == 2) {
                difficulte = 2  // Difficile
                modeInfini = 0
            } else if (selectionDiff == 3) {
                difficulte = 1  // Normal pour infini
                modeInfini = 1  // Mode infini activé
            }

            // Détruire l'interface
            titreDiff.destroy()
            optFacile.destroy()
            optNormal.destroy()
            optDifficile.destroy()
            optInfini.destroy()
            

            // Passer au menu de sélection 1/2 joueurs
            menuNombreJoueurs()
        }
    })
}
info.onCountdownEnd(function () {
    info.player2.setScore(zombie_killed_2)
    info.player1.setScore(zombie_killed)
    totalZombies = zombie_killed + zombie_killed_2
    pause(500)
    if (totalZombies > 75) {
        // VICTOIRE - Animation scientifique
        victoryAnimation()
    } else {
        // DÉFAITE - Animation zombie géant
        defeatAnimation()
    }
})
// Menu de sélection 1 ou 2 joueurs
// Fin correcte de la fonction menuNombreJoueurs
function menuNombreJoueurs () {
    // CORRECTION: Détruire TOUS les sprites du menu difficulté
    if (titreDiff) {
        titreDiff.destroy()
    }
    if (optFacile) {
        optFacile.destroy()
    }
    if (optNormal) {
        optNormal.destroy()
    }
    if (optDifficile) {
        optDifficile.destroy()
    }
    if (optInfini) {
        optInfini.destroy()
    }
    pause(100)
    scene.setBackgroundImage(assets.image`map`)
    if (langue == 1) {
        // Titre
        titreJoueurs = textsprite.create("MODE DE JEU", 0, 15)
    } else {
        // Titre
        titreJoueurs = textsprite.create("GAMEMODE", 0, 15)
    }
    titreJoueurs.setPosition(80, 30)
    titreJoueurs.z = 115
    titreJoueurs.setOutline(1, 2)
    if (langue == 1) {
        // Options
        opt1J = textsprite.create("> SEUL <", 0, 15)
    } else {
        // Options
        opt1J = textsprite.create("> SOLO <", 0, 15)
    }
    opt1J.setPosition(60, 70)
    opt1J.z = 115
    opt1J.setOutline(2, 15)
    if (langue == 1) {
        opt2J = textsprite.create("CO-OP", 0, 15)
    } else {
        opt2J = textsprite.create("CO-OP", 0, 15)
    }
    opt2J.setPosition(100, 70)
    opt2J.z = 115
    controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!(choixFait2)) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionJoueurs = 0
        }
    })
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!(choixFait2)) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionJoueurs = 1
        }
    })
browserEvents.Space.onEvent(browserEvents.KeyEvent.Pressed, function () {
        if (!(choixFait2)) {
            choixFait2 = true
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
            // Appliquer le mode de jeu
            if (selectionJoueurs == 0) {
                // Solo
                modeDeJeu = 1
            } else {
                // Duo
                modeDeJeu = 2
            }
            // Détruire l'interface
            titreJoueurs.destroy()
            opt1J.destroy()
            opt2J.destroy()
            // DÉMARRER LE JEU!
            startGame()
        }
    })
game.onUpdate(function () {
        if (!choixFait2) {
            // CORRECTION: Changement de 'language' à 'langue'
            if (langue == 1) {
                if (selectionJoueurs == 0) {
                    opt1J.setText("> SEUL <")
                    opt1J.setOutline(0, 5)
                    opt2J.setText("  CO-OP")
                    opt2J.setOutline(0, 2)
                } else {
                    opt1J.setText("  SEUL ")
                    opt1J.setOutline(0, 2)
                    opt2J.setText("> CO-OP <")
                    opt2J.setOutline(0, 5)
                }
            } else {
                if (selectionJoueurs == 0) {
                    opt1J.setText("> SOLO <")
                    opt1J.setOutline(0, 5)
                    opt2J.setText("  CO-OP")
                    opt2J.setOutline(0, 2)
                } else {
                    opt1J.setText("  SOLO")
                    opt1J.setOutline(0, 2)
                    opt2J.setText("> CO-OP <")
                    opt2J.setOutline(0, 5)
                }
            }
        }
    })
}
browserEvents.Q.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (rocket_ammo_1 > 0 && mort_1 == 0) {
        music.play(music.createSoundEffect(WaveShape.Square, 1500, 800, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        rocket2 = sprites.createProjectileFromSprite(assets.image`rocket`, joueur3, 0, -150)
        rocket2.setKind(SpriteKind.rocket)
        rocket_ammo_1 += -1
    }
})
browserEvents.ArrowUp.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (menuActif && !(settingsOpen)) {
        // Son de navigation
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        menuSelection += -1
        if (menuSelection < 0) {
            // 3 options (0, 1, 2)
            menuSelection = 1
        }
        if (langue == 2) {
            // Mise à jour visuelle
            if (menuSelection == 0) {
                btnPlay.setText("> PLAY <")
                btnPlay.setOutline(1, 15)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("SETTINGS")
                btnSettings.setOutline(0, 1)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIAL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            } else if (menuSelection == 1) {
                btnPlay.setText("PLAY")
                btnPlay.setOutline(0, 1)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("> SETTINGS <")
                btnSettings.setOutline(1, 15)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIAL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            }
        } else {
            // Mise à jour visuelle
            if (menuSelection == 0) {
                btnPlay.setText("> JOUER <")
                btnPlay.setOutline(1, 15)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("PARAMÈTRES")
                btnSettings.setOutline(0, 1)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIEL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            } else if (menuSelection == 1) {
                btnPlay.setText("JOUER")
                btnPlay.setOutline(0, 1)
                btnPlay.setPosition(80, 70)
                btnSettings.setText("> PARAMÈTRES <")
                btnSettings.setOutline(1, 15)
                btnSettings.setPosition(80, 90)
                btnControls.setText("TUTORIEL (T)")
                btnControls.setOutline(0, 1)
                btnControls.setPosition(80, 110)
            }
        }
    }
})
// Fonction pour afficher le menu principal
function showMainMenu () {
    controle = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        e e e e e e e e e e e e e e e e 
        e e e e e e e e e e e e e e e e 
        e e e e e e e e e e e e e e e e 
        e e e e e e e e e e e e e e e e 
        e e e e e e e e e e e e e e e e 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.cursor_move)
    controle.setPosition(80, 110)
    choixFait = false
    choixFait2 = false
    cheat = 1
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.LoopingInBackground)
    scene.setBackgroundImage(assets.image`map`)
    // Titre du jeu
    titre = textsprite.create("ZOMBIE SURVIVAL", 0, 7)
    titre.z = 110
    titre.setPosition(80, 20)
    titre.setOutline(1, 15)
    titre.setFlag(SpriteFlag.Ghost, true)
    if (langue == 1) {
        // Bouton Play
        btnPlay = textsprite.create("> JOUER <", 0, 5)
    } else {
        // Bouton Play
        btnPlay = textsprite.create("> PLAY <", 0, 5)
    }
    btnPlay.z = 110
    btnPlay.setOutline(1, 15)
    btnPlay.setPosition(80, 70)
    btnPlay.setFlag(SpriteFlag.Ghost, true)
    if (langue == 1) {
        // Bouton Settings
        btnSettings = textsprite.create("PARAMÈTRES", 0, 5)
    } else {
        // Bouton Settings
        btnSettings = textsprite.create("SETTINGS", 0, 5)
    }
    btnSettings.z = 110
    btnSettings.setPosition(80, 90)
    btnSettings.setFlag(SpriteFlag.Ghost, true)
    if (langue == 1) {
        // Bouton Contrôles (NOUVEAU)
        // Bouton Contrôles (NOUVEAU)
        // ← Sans "let"
        btnControls = textsprite.create("TUTORIEL (T)", 0, 15)
    } else {
        // Bouton Contrôles (NOUVEAU)
        // Bouton Contrôles (NOUVEAU)
        // ← Sans "let"
        btnControls = textsprite.create("TUTORIAL (T)", 0, 15)
    }
    btnControls.z = 110
    btnControls.setPosition(80, 110)
    btnControls.setFlag(SpriteFlag.Ghost, true)
    // Animation des personnages
    animJoueur1 = sprites.create(assets.image`joueur_1`, SpriteKind.Player)
    animJoueur1.z = 110
    animJoueur1.setPosition(40, 50)
    animJoueur1.setFlag(SpriteFlag.Ghost, true)
    animJoueur2 = sprites.create(assets.image`joueur_2`, SpriteKind.joueur)
    animJoueur2.z = 110
    animJoueur2.setPosition(120, 50)
    animJoueur2.setFlag(SpriteFlag.Ghost, true)
    // Animation de rebond
    animJoueur1.ay = 200
    animJoueur2.ay = 200
    game.onUpdate(function () {
        if (menuActif) {
            // Animation rebond joueur 1
            if (animJoueur1.y >= 50) {
                animJoueur1.vy = -80
            }
            // Animation rebond joueur 2
            if (animJoueur2.y >= 50) {
                animJoueur2.vy = -80
            }
        }
    })
}
// Animation de victoire - Scientifique sauve le monde
function victoryAnimation () {
    munition_2 = 0
    munition_2 = 0
    timer.after(500, function () {
        // Son d'hélicoptère qui arrive
        music.play(music.createSoundEffect(WaveShape.Noise, 2000, 1500, 255, 150, 2000, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        // Créer l'hélicoptère qui arrive
        helicoptere = sprites.create(assets.image`hélicopter`, SpriteKind.helicopter)
        helicoptere.setPosition(80, -20)
        helicoptere.z = 120
        helicoptere.setVelocity(0, 30)
        timer.after(2000, function () {
            // Atterrissage de l'hélicoptère
            helicoptere.setVelocity(0, 0)
            helicoptere.setPosition(80, 40)
            // Son d'atterrissage
            music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
            timer.after(1000, function () {
                // Scientifique sort de l'hélicoptère
                scientifique = sprites.create(assets.image`zombie_militaire`, SpriteKind.Player)
                scientifique.setPosition(80, 50)
                scientifique.z = 110
                // Voix du scientifique
                music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
                if (langue == 1) {
                    scientifique.sayText("J'AI UN REMÈDE", 2000, false)
                } else {
                    scientifique.sayText("I HAVE A CURE", 2000, false)
                }
                timer.after(2000, function () {
                    // Effet de guérison - flash vert
                    scene.cameraShake(4, 2000)
                    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
                    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
                    // Arrêter les spawns de zombies
                    cheat = 0
                    // Transformer tous les zombies en humains
                    for (let zombie2 of sprites.allOfKind(SpriteKind.Enemy)) {
                        zombie2.setImage(assets.image`humain`)
                        zombie2.setVelocity(0, 0)
                        zombie2.setKind(SpriteKind.humain)
                        zombie2.follow(helicoptere, 15)
                    }
                    timer.after(2000, function () {
                        color.startFadeFromCurrent(color.originalPalette)
                        if (langue == 1) {
                            scientifique.sayText("J'AI SAUVÉ LE MONDE!", 2000, false)
                            timer.after(500, function () {
                                joueur3.sayText("MERCI!", 1500, false)
                                if (modeDeJeu == 2) {
                                    joueur2.sayText("MERCI!", 1500, false)
                                }
                            })
                        } else {
                            scientifique.sayText("I SAVED THE WORLD!", 2000, false)
                            timer.after(500, function () {
                                joueur3.sayText("THANKS!", 1500, false)
                                if (modeDeJeu == 2) {
                                    joueur2.sayText("THANKS!", 1500, false)
                                }
                            })
                        }
                        // Musique de victoire épique
                        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
                        pause(1000)
                        color.startFadeFromCurrent(color.originalPalette)
                        timer.after(3000, function () {
                            info.player1.setScore(zombie_killed)
                            if (modeDeJeu == 2) {
                                info.player2.setScore(zombie_killed_2)
                            }
                            pause(100)
                            // Afficher l'écran de victoire
                            game.gameOver(true)
                            game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), true)
                            if (langue == 1) {
                                game.setGameOverMessage(true, "VICTOIRE! LE MONDE EST SAUVE!")
                            } else {
                                game.setGameOverMessage(true, "VICTORY! THE WORLD IS SAVED!")
                            }
                            game.setGameOverEffect(true, effects.confetti)
                            game.setGameOverScoringType(game.ScoringType.HighScore)
                        })
                    })
                })
            })
        })
    })
}
browserEvents.Space.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (menuActif && !(settingsOpen) && !(menuLocked)) {
        // Verrouiller immédiatement
        menuLocked = true
        if (menuSelection == 0) {
            timer.after(500, function () {
                menuDifficulte()
                // Déverrouiller après
                menuLocked = false
            })
        } else if (menuSelection == 1) {
            music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
            settingsOpen = true
            showSettings(titre, btnPlay, btnSettings, animJoueur1, animJoueur2)
menuLocked = false
        } else if (menuSelection == 2) {
            timer.after(500, function () {
                music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
                settingsOpen = true
                showControls(titre, btnPlay, btnSettings, btnControls, animJoueur1, animJoueur2)
menuLocked = false
            })
        }
    }
})
browserEvents.T.onEvent(browserEvents.KeyEvent.Pressed, function () {
    // Détecter si on est sur le menu principal et sur CONTROLS
    if (menuActif && !(settingsOpen) && !(menuLocked)) {
        // Le curseur est sur CONTROLS (menuSelection == 2)
        // Verrouiller pour éviter les clics multiples
        menuLocked = true
        // Cacher le menu
        titre.setFlag(SpriteFlag.Invisible, true)
        btnPlay.setFlag(SpriteFlag.Invisible, true)
        btnSettings.setFlag(SpriteFlag.Invisible, true)
        btnControls.setFlag(SpriteFlag.Invisible, true)
        animJoueur1.setFlag(SpriteFlag.Invisible, true)
        animJoueur2.setFlag(SpriteFlag.Invisible, true)
        // Arrêter les animations
        animJoueur1.ay = 0
        animJoueur1.vy = 0
        animJoueur2.ay = 0
        animJoueur2.vy = 0
        // Désactiver le menu
        menuActif = false
        tutorial = true
        // Lancer le tutoriel
        Tutorial()
        // Détruire les sprites du menu après un délai
        timer.after(100, function () {
            titre.destroy()
            btnPlay.destroy()
            btnSettings.destroy()
            btnControls.destroy()
            animJoueur1.destroy()
            animJoueur2.destroy()
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (joueur2, ennemi2) {
    if (info.player1.life() < 2) {
        sprites.destroy(joueur2, effects.disintegrate, 500)
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        pause(3000)
        info.player1.changeLifeBy(-1)
        mort_1 = 1
    } else {
        ennemi2.destroy()
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        info.player1.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Tutorial_Ennemy, function (sprite, otherSprite) {
    sprites.destroy(balle)
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tutorial_mutant).value > 0) {
        statusbar.value += -1
        sprites.destroy(balle)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    } else if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tutorial_mutant).value == 0) {
        sprites.destroy(tutorial_mutant, effects.fire, 500)
        sprites.destroy(balle)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (joueur, recharge) {
    if (joueur3.overlapsWith(recharge)) {
        recharge.destroy()
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        munitions += 5
        info.player1.setScore(munitions)
    }
})
// NOUVELLE COLLISION BALLE JOUEUR 2 - ZOMBIE (AJOUTÉE)
sprites.onOverlap(SpriteKind.projectile_2, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Hard_mode == 1) {
        _2vies = 1
    }
    if (star_screen == 1 || _2vies == 1) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
        sprites.destroy(sprite)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value <= 0) {
            sprites.destroy(otherSprite, effects.fire, 100)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
            // Score pour JOUEUR 2
            zombie_killed_2 += 1
            if (Math.percentChance(5) && soin > 0) {
                med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
                med_kit2.setPosition(otherSprite.x, otherSprite.y)
                med_kit2.setVelocity(0, 50)
                soin += -1
            } else if (Math.percentChance(40)) {
                recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
                recharge2.setPosition(otherSprite.x, otherSprite.y)
                recharge2.setVelocity(0, 50)
            }
            if (goreMode == 1) {
                if (Math.percentChance(33)) {
                    death_zombie = sprites.create(assets.image`zombie_mort 1`, SpriteKind.blood)
                    death_zombie.setPosition(otherSprite.x, otherSprite.y)
                    death_zombie.setVelocity(0, 0)
                    death_zombie.z = 0
                } else if (Math.percentChance(50)) {
                    death_zombie_2 = sprites.create(assets.image`zombie_mort 2`, SpriteKind.blood)
                    death_zombie_2.setPosition(otherSprite.x, otherSprite.y)
                    death_zombie_2.setVelocity(0, 0)
                    death_zombie_2.z = 0
                } else {
                    zombie_death_3 = sprites.create(assets.image`zombie_mort 3`, SpriteKind.blood)
                    zombie_death_3.setPosition(otherSprite.x, otherSprite.y)
                    zombie_death_3.setVelocity(0, 0)
                    zombie_death_3.z = 0
                }
            }
        }
    } else {
        sprites.destroy(sprite)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.fire, 100)
        // Score pour JOUEUR 2
        zombie_killed_2 += 1
        if (Math.percentChance(5) && soin > 0) {
            med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
            med_kit2.setPosition(otherSprite.x, otherSprite.y)
            med_kit2.setVelocity(0, 50)
            soin += -1
        } else if (Math.percentChance(40)) {
            recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
            recharge2.setPosition(otherSprite.x, otherSprite.y)
            recharge2.setVelocity(0, 50)
        }
        if (goreMode == 1) {
            if (Math.percentChance(33)) {
                death_zombie = sprites.create(assets.image`zombie_mort 1`, SpriteKind.blood)
                death_zombie.setPosition(otherSprite.x, otherSprite.y)
                death_zombie.setVelocity(0, 0)
                death_zombie.z = 0
            } else if (Math.percentChance(50)) {
                death_zombie_2 = sprites.create(assets.image`zombie_mort 2`, SpriteKind.blood)
                death_zombie_2.setPosition(otherSprite.x, otherSprite.y)
                death_zombie_2.setVelocity(0, 0)
                death_zombie_2.z = 0
            } else {
                zombie_death_3 = sprites.create(assets.image`zombie_mort 3`, SpriteKind.blood)
                zombie_death_3.setPosition(otherSprite.x, otherSprite.y)
                zombie_death_3.setVelocity(0, 0)
                zombie_death_3.z = 0
            }
        }
    }
})
// Fonction pour obtenir l'intervalle de spawn selon la vague
function getZombieSpawnInterval (wave: number) {
    baseInterval = 300
    // Ajustement selon la vague
    if (wave == 1) {
        baseInterval = 300
    } else if (wave == 2) {
        baseInterval = 180
    } else if (wave >= 3) {
        baseInterval = 100
    }
    // Ajustement selon la difficulté
    if (difficulte == 0) {
        // Facile - 50% plus lent
        return baseInterval + Math.floor(baseInterval * 0.5)
    } else if (difficulte == 1) {
        // Normal - vitesse normale
        return baseInterval
    } else if (difficulte == 2) {
        // Difficile - 40% plus rapide
        return Math.floor(baseInterval * 0.6)
    }
    return baseInterval
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ennemy_zombie, function (sprite, otherSprite) {
    sprites.destroy(Ennemi, effects.fire, 500)
    sprites.destroy(balle)
})
sprites.onOverlap(SpriteKind.projectile_2, SpriteKind.Tutorial_Ennemy, function (sprite, otherSprite) {
    sprites.destroy(balle_2)
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tutorial_mutant).value > 0) {
        statusbar.value += -1
        sprites.destroy(balle_2)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    } else if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tutorial_mutant).value == 0) {
        sprites.destroy(tutorial_mutant, effects.fire, 500)
        sprites.destroy(balle_2)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
})
function Tutorial () {
    zombieSpawnInterval = 9999999
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    tutorial = true
    terre = sprites.create(assets.image`antinuke`, SpriteKind.antinuke)
    terre.setPosition(80, 75)
    terre.setVelocity(0, 0)
    joueur3 = sprites.create(assets.image`joueur_1`, SpriteKind.Player)
    controller.moveSprite(joueur3, 85, 85)
    joueur3.setStayInScreen(true)
    joueur3.z = 100
    joueur3.setPosition(75, 105)
    info.player1.setLife(3)
    munitions = 50
    // 3 rockets au départ
    rocket_ammo_1 = 3
    info.player1.setScore(munitions)
    joueur2 = sprites.create(assets.image`joueur_2`, SpriteKind.joueur)
    controller.player2.moveSprite(joueur2, 85, 85)
    joueur2.setStayInScreen(true)
    joueur2.z = 100
    joueur2.setPosition(85, 105)
    info.player2.setLife(3)
    munition_2 = 50
    // 3 rockets au départ
    rocket_ammo_2 = 3
    info.player2.setScore(munition_2)
    timer.after(500, function () {
        tutoriel_texte()
    })
}
function call_AI_soldier () {
    timer.after(500, function () {
        // Son d'hélicoptère qui arrive
        music.play(music.createSoundEffect(WaveShape.Noise, 2000, 1500, 255, 150, 2000, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        // Créer l'hélicoptère qui arrive
        helicoptere = sprites.create(assets.image`hélicopter`, SpriteKind.helicopter)
        helicoptere.setPosition(80, -20)
        helicoptere.z = 120
        helicoptere.setVelocity(0, 40)
        helicoptere.setStayInScreen(false)
        timer.after(2750, function () {
            // Atterrissage de l'hélicoptère
            helicoptere.setVelocity(0, 0)
            helicoptere.setPosition(80, 90)
            // Son d'atterrissage
            music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
            timer.after(1000, function () {
                AI_soldier = sprites.create(assets.image`AI_soldier`, SpriteKind.auto_shooting)
                AI_soldier.setStayInScreen(true)
                AI_soldier.setPosition(80, 115)
                AI_soldier_taken = false
                AI_soldier_spawned = true
                timer.after(500, function () {
                    helicoptere.setVelocity(0, -40)
                    AI_soldier_target()
                    timer.after(3000, function () {
                        sprites.destroy(helicoptere)
                    })
                })
            })
        })
    })
}
sprites.onOverlap(SpriteKind.antinuke, SpriteKind.NUKe, function (sprite, otherSprite) {
    color.startFade(color.originalPalette, color.White)
    scene.cameraShake(10, 5000)
    sprites.destroy(otherSprite)
    music.setVolume(250)
    music.play(music.createSoundEffect(WaveShape.Noise, 276, 232, 255, 186, 2000, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    pause(2000)
    sprites.destroyAllSpritesOfKind(SpriteKind.blood, effects.ashes, 100)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.ashes, 100)
    color.startFadeFromCurrent(color.originalPalette)
    music.setVolume(20)
    star_screen = 1
    _2vies = 1
    effects.starField.startScreenEffect(30000)
    pause(30000)
    star_screen = 0
    _2vies = 0
})
sprites.onOverlap(SpriteKind.joueur, SpriteKind.gros_zombie, function (sprite, otherSprite) {
    if (modeDeJeu == 2) {
        sprites.destroy(joueur2, effects.disintegrate, 500)
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        pause(3000)
        info.player2.setLife(0)
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (munitions > 0 && mort_1 == 0) {
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        balle = sprites.createProjectileFromSprite(assets.image`balle`, joueur3, 0, -200)
        balle.setKind(SpriteKind.Projectile)
        munitions += -1
        info.player1.changeScoreBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.med_kit, function (sprite, otherSprite) {
    if (info.player1.life() < 3) {
        med_kit2.destroy()
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        info.player1.changeLifeBy(1)
    }
})
sprites.onOverlap(SpriteKind.joueur, SpriteKind.med_kit, function (sprite, otherSprite) {
    if (info.player2.life() < 3) {
        med_kit2.destroy()
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        info.player2.changeLifeBy(1)
    }
})
info.player2.onScore(4, function () {
    if (munition_2 < 5 && caisse_deja_apparue > 0) {
        if (modeDeJeu == 2) {
            if (langue == 1) {
                joueur2.sayText("BESOIN DE BALLES!", 2000, false)
            } else {
                joueur2.sayText("NEED MUNITIONS !", 2000, false)
            }
            if (mort_2 == 0) {
                caisse_munition = sprites.create(assets.image`ammobox_en_air`, SpriteKind.amobox)
                caisse_munition.setPosition(80, -2)
                caisse_munition.setVelocity(0, 30)
                caisse_deja_apparue += -1
            }
        }
    }
})
// COLLISION BALLE JOUEUR 1 - ZOMBIE (CORRIGÉE)
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Hard_mode == 1) {
        _2vies = 1
    }
    if (star_screen == 1 || _2vies == 1) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
        sprites.destroy(sprite)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (AI_soldier_taken == true) {
            AI_soldier_shoot()
        }
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value <= 0) {
            sprites.destroy(otherSprite, effects.fire, 100)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
            // Score pour JOUEUR 1
            zombie_killed += 1
            if (AI_soldier_taken == true) {
                AI_soldier_taken = false
                AI_soldier_target()
            }
            if (Math.percentChance(5) && soin > 0) {
                med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
                med_kit2.setPosition(otherSprite.x, otherSprite.y)
                med_kit2.setVelocity(0, 50)
                soin += -1
            } else if (Math.percentChance(40)) {
                recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
                recharge2.setPosition(otherSprite.x, otherSprite.y)
                recharge2.setVelocity(0, 50)
            }
            if (goreMode == 1) {
                if (Math.percentChance(33)) {
                    death_zombie = sprites.create(assets.image`zombie_mort 1`, SpriteKind.blood)
                    death_zombie.setPosition(otherSprite.x, otherSprite.y)
                    death_zombie.setVelocity(0, 0)
                    death_zombie.z = 0
                } else if (Math.percentChance(50)) {
                    death_zombie_2 = sprites.create(assets.image`zombie_mort 2`, SpriteKind.blood)
                    death_zombie_2.setPosition(otherSprite.x, otherSprite.y)
                    death_zombie_2.setVelocity(0, 0)
                    death_zombie_2.z = 0
                } else {
                    zombie_death_3 = sprites.create(assets.image`zombie_mort 3`, SpriteKind.blood)
                    zombie_death_3.setPosition(otherSprite.x, otherSprite.y)
                    zombie_death_3.setVelocity(0, 0)
                    zombie_death_3.z = 0
                }
            }
        }
    } else {
        sprites.destroy(sprite)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.fire, 100)
        // Score pour JOUEUR 1
        zombie_killed += 1
        if (Math.percentChance(5) && soin > 0) {
            med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
            med_kit2.setPosition(otherSprite.x, otherSprite.y)
            med_kit2.setVelocity(0, 50)
            soin += -1
        } else if (Math.percentChance(40)) {
            recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
            recharge2.setPosition(otherSprite.x, otherSprite.y)
            recharge2.setVelocity(0, 50)
        }
        if (goreMode == 1) {
            if (Math.percentChance(33)) {
                death_zombie = sprites.create(assets.image`zombie_mort 1`, SpriteKind.blood)
                death_zombie.setPosition(otherSprite.x, otherSprite.y)
                death_zombie.setVelocity(0, 0)
                death_zombie.z = 0
            } else if (Math.percentChance(50)) {
                death_zombie_2 = sprites.create(assets.image`zombie_mort 2`, SpriteKind.blood)
                death_zombie_2.setPosition(otherSprite.x, otherSprite.y)
                death_zombie_2.setVelocity(0, 0)
                death_zombie_2.z = 0
            } else {
                zombie_death_3 = sprites.create(assets.image`zombie_mort 3`, SpriteKind.blood)
                zombie_death_3.setPosition(otherSprite.x, otherSprite.y)
                zombie_death_3.setVelocity(0, 0)
                zombie_death_3.z = 0
            }
        }
    }
})
// COLLISION ROCKET JOUEUR 1 - ZOMBIE (EXPLOSION ZONE)
sprites.onOverlap(SpriteKind.rocket, SpriteKind.Enemy, function (sprite, otherSprite) {
    // Explosion visuelle
    explosion2 = sprites.create(assets.image`explosion`, SpriteKind.explosion)
    explosion2.setPosition(sprite.x, sprite.y)
    explosion2.lifespan = 500
    // Son d'explosion
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(6, 300)
    // ZONE D'EXPLOSION - Détruit tous les zombies proches
    for (let zombie22 of sprites.allOfKind(SpriteKind.Enemy)) {
        distance = Math.abs(zombie22.x - explosion2.x) + Math.abs(zombie22.y - explosion2.y)
        if (distance < 40) {
            sprites.destroy(zombie22, effects.fire, 100)
            if (tutorial) {
            	
            } else {
                zombie_killed += 1
                // Drops possibles
                if (Math.percentChance(10) && soin > 0) {
                    med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
                    med_kit2.setPosition(zombie22.x, zombie22.y)
                    med_kit2.setVelocity(0, 50)
                    soin += -1
                } else if (Math.percentChance(30)) {
                    recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
                    recharge2.setPosition(zombie22.x, zombie22.y)
                    recharge2.setVelocity(0, 50)
                }
            }
        }
    }
    // Détruire la rocket
    sprites.destroy(sprite, effects.fire, 100)
})
// COLLISION ROCKET JOUEUR 2 - ZOMBIE (EXPLOSION ZONE)
sprites.onOverlap(SpriteKind.rocket_2, SpriteKind.Enemy, function (sprite, otherSprite) {
    // Explosion visuelle
    explosion3 = sprites.create(assets.image`explosion`, SpriteKind.explosion)
    explosion3.setPosition(sprite.x, sprite.y)
    explosion3.lifespan = 500
    // Son d'explosion
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(6, 300)
    // ZONE D'EXPLOSION - Détruit tous les zombies proches
    for (let zombie3 of sprites.allOfKind(SpriteKind.Enemy)) {
        distance2 = Math.abs(zombie3.x - explosion3.x) + Math.abs(zombie3.y - explosion3.y)
        if (distance2 < 40) {
            sprites.destroy(zombie3, effects.fire, 100)
            if (tutorial) {
            	
            } else {
                zombie_killed_2 += 1
                // Drops possibles
                if (Math.percentChance(10) && soin > 0) {
                    med_kit2 = sprites.create(assets.image`med_kit`, SpriteKind.med_kit)
                    med_kit2.setPosition(zombie3.x, zombie3.y)
                    med_kit2.setVelocity(0, 50)
                    soin += -1
                } else if (Math.percentChance(30)) {
                    recharge2 = sprites.create(assets.image`munition0`, SpriteKind.Food)
                    recharge2.setPosition(zombie3.x, zombie3.y)
                    recharge2.setVelocity(0, 50)
                }
            }
        }
    }
    // Détruire la rocket
    sprites.destroy(sprite, effects.fire, 100)
})
let lastZombieSpawnTime = 0
let bomb: Sprite = null
let newWave = 0
let elapsedTime = 0
let distance2 = 0
let explosion3: Sprite = null
let distance = 0
let explosion2: Sprite = null
let baseInterval = 0
let zombie_death_3: Sprite = null
let death_zombie_2: Sprite = null
let death_zombie: Sprite = null
let med_kit2: Sprite = null
let star_screen = 0
let balle: Sprite = null
let menuLocked = false
let scientifique: Sprite = null
let helicoptere: Sprite = null
let controle: Sprite = null
let rocket2: Sprite = null
let totalZombies = 0
let zombie_killed_2 = 0
let zombieCible: Sprite = null
let dist = 0
let distanceMin = 0
let zombies: Sprite[] = []
let recharge2: Sprite = null
let statusbar: StatusBarSprite = null
let tutorial_mutant: Sprite = null
let offsetX = 0
let positionGroupe = 0
let nombreZombies = 0
let caisse: Sprite = null
let ammo: Sprite = null
let medkit: Sprite = null
let currentWave = 0
let wave = 0
let gameStartTime = 0
let rocket_ammo_1 = 0
let terre: Sprite = null
let carte: Sprite = null
let Hard_mode = 0
let soin = 0
let zombie_killed = 0
let Hulk = false
let waveTextTimer = 0
let rocket_22: Sprite = null
let rocket_ammo_2 = 0
let Ennemi: Sprite = null
let mort_1 = 0
let caisse_munition: Sprite = null
let AI_soldier: Sprite = null
let projectile: Sprite = null
let balle_2: Sprite = null
let mort_2 = 0
let menuSelection = 0
let caisse_deja_apparue = 0
let _2vies = 0
let zombie_speed = 0
let NUKE = 0
let joueur2: Sprite = null
let joueur3: Sprite = null
let zombieGiant: Sprite = null
let munitions = 0
let munition_2 = 0
let cheat = 0
let game_started = 0
let zombieSpawnInterval = 0
let AI_soldier_taken = false
let AI_soldier_spawned = false
let langue = 0
let tutorial = false
let titreJoueurs: TextSprite = null
let modeDeJeu = 0
let selectionDiff = 0
let choixFait = false
let selectionJoueurs = 0
let choixFait2 = false
// 0 = Désactivé, 1 = Activé pour joueur 1
let minigunActif_1 = 0
// 0 = Désactivé, 1 = Activé pour joueur 2
let minigunActif_2 = 0
// 0 = Mode normal (3 min), 1 = Mode infini
let modeInfini = 0
let volumeMusique = 0
let scientifique2 = null
let helicoptere2 = null
let zombieGiant2 = null
let settingsOpen = false
let waveText: TextSprite = null
let otherSprite = null
let titre: TextSprite = null
let btnPlay: TextSprite = null
let btnControls: TextSprite = null
let btnSettings: TextSprite = null
let animJoueur1: Sprite = null
let animJoueur2: Sprite = null
// Position dans le menu settings (0=Volume, 1=Gore, 2=Retour)
let settingsSelection = 0
let goreMode = 0
let menuActif = false
let difficulte = 0
let titreDiff: TextSprite = null
let optFacile: TextSprite = null
let optNormal: TextSprite = null
let optDifficile: TextSprite = null
let optInfini: TextSprite = null
let opt1J: TextSprite = null
let opt2J: TextSprite = null
let tutorielActif = false
let etapeTutoriel = 0
let zombies2: number[] = []
let distanceMin2 = 0
let dist2 = 0
langue = 2
langue = 1
AI_soldier_spawned = false
AI_soldier_taken = false
browserEvents.setCursorVisible(false)
// 1 = Français, 2 = English
langue = 2
// 1 = Solo, 2 = Duo
modeDeJeu = 2
// 0 = Facile, 1 = Normal, 2 = Difficile
difficulte = 1
// Volume de 0 à 100
volumeMusique = 100
// 1 = Activé, 0 = Désactivé
goreMode = 1
function showSettings(titre: TextSprite, btnPlay: TextSprite, btnSettings: TextSprite, animJ1: Sprite, animJ2: Sprite) {
    // Cacher le menu principal
    titre.setFlag(SpriteFlag.Invisible, true)
    btnPlay.setFlag(SpriteFlag.Invisible, true)
    btnSettings.setFlag(SpriteFlag.Invisible, true)
    btnControls.setFlag(SpriteFlag.Invisible, true)
    animJ1.setFlag(SpriteFlag.Invisible, true)
    animJ2.setFlag(SpriteFlag.Invisible, true)

    scene.setBackgroundImage(assets.image`map`)

    // Titre
    let titreSettings = textsprite.create("=== PARAMETRES ===", 0, 15)
    titreSettings.setPosition(80, 20)
    titreSettings.z = 115

    // Options
    let optVolume = textsprite.create("> Volume: " + volumeMusique, 0, 5)
    optVolume.setPosition(80, 50)
    optVolume.z = 115

    let optGore = textsprite.create("Sang: " + (goreMode == 1 ? "ON" : "OFF"), 0, 5)
    optGore.setPosition(80, 70)
    optGore.z = 115

    let optLangue = textsprite.create("Langue: " + (langue == 1 ? "FRANCAIS" : "ENGLAIS"), 0, 5)
    optLangue.setPosition(80, 90)
    optLangue.z = 115

    let optRetour = textsprite.create("RETOUR", 0, 5)
    optRetour.setPosition(80, 110)
    optRetour.z = 115

    let selectionSettings = 0
    let settingsActif = true

    // Boucle de sélection
    game.onUpdate(function () {
        if (settingsActif) {
            // Mise à jour visuelle
            if (langue == 1) {
                titreSettings.setText("=== PARAMÈTRES ===")
                titreSettings.setOutline(0.9, 15)
                titreSettings.setPosition(80, 20)
                if (selectionSettings == 0) {
                    optVolume.setText("> Volume: " + volumeMusique + " <")
                    optVolume.setOutline(1, 15)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Sang: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Langue: " + (langue == 1 ? "FRANCAIS" : "ENGLAIS"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETOUR")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 1) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("> Sang: " + (goreMode == 1 ? "ON" : "OFF") + " <")
                    optGore.setOutline(1, 15)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Langue: " + (langue == 1 ? "FRANCAIS" : "ENGLAIS"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETOUR")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 2) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Sang: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("> Langue: " + (langue == 1 ? "FRANCAIS" : "ENGLAIS") + " <")
                    optLangue.setOutline(1, 15)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETOUR")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 3) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Sang: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Langue: " + (langue == 1 ? "FRANCAIS" : "ENGLAIS"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("> RETOUR <")
                    optRetour.setOutline(1, 15)
                    optRetour.setPosition(80, 110)
                }
            } else {
                titreSettings.setText("=== SETTINGS ===")
                titreSettings.setOutline(0.9, 15)
                titreSettings.setPosition(80, 20)
                if (selectionSettings == 0) {
                    optVolume.setText("> Volume: " + volumeMusique + " <")
                    optVolume.setOutline(1, 15)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Gore: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Language: " + (langue == 1 ? "FRENCH" : "ENGLISH"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETURN")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 1) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("> Gore: " + (goreMode == 1 ? "ON" : "OFF") + " <")
                    optGore.setOutline(1, 15)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Language: " + (langue == 1 ? "FRENCH" : "ENGLISH"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETURN")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 2) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Gore: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("> Language: " + (langue == 1 ? "FRENCH" : "ENGLISH") + " <")
                    optLangue.setOutline(1, 15)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("RETURN")
                    optRetour.setOutline(0, 1)
                    optRetour.setPosition(80, 110)
                } else if (selectionSettings == 3) {
                    optVolume.setText("Volume: " + volumeMusique)
                    optVolume.setOutline(0, 1)
                    optVolume.setPosition(80, 50)
                    optGore.setText("Gore: " + (goreMode == 1 ? "ON" : "OFF"))
                    optGore.setOutline(0, 1)
                    optGore.setPosition(80, 70)
                    optLangue.setText("Language: " + (langue == 1 ? "FRENCH" : "ENGLISH"))
                    optLangue.setOutline(0, 1)
                    optLangue.setPosition(80, 90)
                    optRetour.setText("> RETURN <")
                    optRetour.setOutline(1, 15)
                    optRetour.setPosition(80, 110)
                }
            }
        }
    })

    // Navigation HAUT
    controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
        if (settingsActif) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionSettings -= 1
            if (selectionSettings < 0) {
                selectionSettings = 3
            }
        }
    })

    // Navigation BAS
    controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
        if (settingsActif) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            selectionSettings += 1
            if (selectionSettings > 3) {
                selectionSettings = 0
            }
        }
    })

    // Navigation GAUCHE - Diminuer
    controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
        if (settingsActif) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)

            if (selectionSettings == 0) {
                // Volume -10
                volumeMusique -= 10
                if (volumeMusique < 0) {
                    volumeMusique = 0
                }
                music.setVolume(volumeMusique)
            } else if (selectionSettings == 1) {
                // Gore OFF
                goreMode = 0
            } else if (selectionSettings == 2) {
                // Langue: Français
                langue = 1
            }
        }
    })

    // Navigation DROITE - Augmenter
    controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
        if (settingsActif) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)

            if (selectionSettings == 0) {
                // Volume +10
                volumeMusique += 10
                if (volumeMusique > 100) {
                    volumeMusique = 100
                }
                music.setVolume(volumeMusique)
            } else if (selectionSettings == 1) {
                // Gore ON
                goreMode = 1
            } else if (selectionSettings == 2) {
                // Langue: English
                langue = 2
            }
        }
    })

    // Validation avec A
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (settingsActif && selectionSettings == 3) {
            // RETOUR sélectionné
            settingsActif = false
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)

            // Détruire l'interface
            titreSettings.destroy()
            optVolume.destroy()
            optGore.destroy()
            optLangue.destroy()
            optRetour.destroy()

            // Restaurer le menu principal
            settingsOpen = false
            menuActif = true
            titre.setFlag(SpriteFlag.Invisible, false)
            btnPlay.setFlag(SpriteFlag.Invisible, false)
            btnSettings.setFlag(SpriteFlag.Invisible, false)
            btnControls.setFlag(SpriteFlag.Invisible, false)
            animJ1.setFlag(SpriteFlag.Invisible, false)
            animJ2.setFlag(SpriteFlag.Invisible, false)
        }
    })
}
function showControls(titre: TextSprite, btnPlay: TextSprite, btnSettings: TextSprite, btnControls: TextSprite, animJ1: Sprite, animJ2: Sprite) {
    // Cacher le menu principal
    titre.setFlag(SpriteFlag.Invisible, true)
    btnPlay.setFlag(SpriteFlag.Invisible, true)
    btnSettings.setFlag(SpriteFlag.Invisible, true)
    btnControls.setFlag(SpriteFlag.Invisible, true)
    animJ1.setFlag(SpriteFlag.Invisible, true)
    animJ2.setFlag(SpriteFlag.Invisible, true)

    // Afficher les contrôles détaillés
    if (langue == 1) {
     game.showLongText("CONTROLES\\nJOUEUR 1:\\nDéplacer: WASD\\n Tirer balle: E\\n Tirer roquette: Q\\nJOUEUR 2:\\n Déplacer: IJKL\\n Tirer balle: O\\n Tirer rocket: U\\n OBJECTIF\\nSurvivez 3 minutes\\nTuez 75+ zombies\\n Appuyez A pour retour", DialogLayout.Full)
    }
    if (langue == 2) {
     game.showLongText("CONTROLS\\nPLAYER 1:\\nMove: WASD\\n Shoot bullet: E\\n Shoot rocket: Q\\nPLAYER 2:\\n MOVE: IJKL\\n Shoot bullet: O\\n Shoot rocket: U\\n OBJECTIVE\\nSurvive 3 minutes\\nKill 75+ zombies\\n Click A for return", DialogLayout.Full)
    }
    // Retour au menu
    settingsOpen = false
    titre.setFlag(SpriteFlag.Invisible, false)
    btnPlay.setFlag(SpriteFlag.Invisible, false)
    btnSettings.setFlag(SpriteFlag.Invisible, false)
    btnControls.setFlag(SpriteFlag.Invisible, false)
    animJ1.setFlag(SpriteFlag.Invisible, false)
    animJ2.setFlag(SpriteFlag.Invisible, false)
}
menuActif = true
zombieSpawnInterval = 500
game_started = 0
// <--- Déclaration globale unique
music.setVolume(100)
// Démarrer le jeu avec le menu
showMainMenu()
// Détruire les zombies qui sortent de l'écran
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.y > 125) {
            sprites.destroy(value)
        }
    }
})
// *** LIGNES REDONDANTES SUPPRIMÉES ICI POUR CORRIGER LES ERREURS ***
// Système de gestion des vagues basé sur le temps
game.onUpdate(function () {
    elapsedTime = Math.floor((game.runtime() - gameStartTime) / 1000)
    newWave = Math.floor(elapsedTime / 60) + 1
    // Limiter à 3 vagues maximum
    if (newWave > 3) {
        newWave = 3
    }
    if (newWave != currentWave && newWave <= 3) {
        if (wave == 1) {
            currentWave = newWave
            zombieSpawnInterval = getZombieSpawnInterval(currentWave)
            showWaveText(currentWave)
        }
    }
})
// Gestion de la destruction du texte de vague après 3 secondes
game.onUpdate(function () {
    if (waveText && game.runtime() >= waveTextTimer) {
        waveText.destroy()
        waveText = null
    }
})
game.onUpdate(function () {
    if ((zombie_killed == 100 || zombie_killed_2 == 100) && NUKE == 1) {
        NUKE = 0
        joueur3.sayText("NUKE", 5000, false)
        music.play(music.createSoundEffect(WaveShape.Square, 2033, 1110, 244, 0, 1500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        bomb = sprites.create(assets.image`nuke`, SpriteKind.NUKe)
        bomb.setPosition(80, 0)
        bomb.setVelocity(0, 40)
    }
})
game.onUpdate(function () {
    if (cheat == 1 && game.runtime() - lastZombieSpawnTime >= zombieSpawnInterval) {
        lastZombieSpawnTime = game.runtime()
        // 8% de chance de spawner un GROUPE de zombies
        if (Math.percentChance(8)) {
            if (difficulte == 0) {
                // Groupe de 3 à 6 zombies
                nombreZombies = randint(3, 6)
            } else if (difficulte == 1) {
                // Groupe de 3 à 6 zombies
                nombreZombies = randint(5, 9)
            } else if (difficulte == 2) {
                // Groupe de 3 à 6 zombies
                nombreZombies = randint(5, 12)
            }
            // Position centrale du groupe
            positionGroupe = randint(20, 140)
            for (let index = 0; index < nombreZombies; index++) {
                // Créer un zombie avec une légère variation de position
                offsetX = randint(-15, 15)
                if (Math.percentChance(50)) {
                    Ennemi = sprites.create(assets.image`zombie`, SpriteKind.Enemy)
                } else if (Math.percentChance(60)) {
                    Ennemi = sprites.create(assets.image`zombie 2`, SpriteKind.Enemy)
                } else if (Math.percentChance(70)) {
                    Ennemi = sprites.create(assets.image`zombie 3`, SpriteKind.Enemy)
                } else {
                    Ennemi = sprites.create(assets.image`zombie 4`, SpriteKind.Enemy)
                }
                if (star_screen == 1 || _2vies == 1) {
                    statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                    statusbar.attachToSprite(Ennemi)
                    statusbar.max = 2
                }
                Ennemi.setPosition(positionGroupe + offsetX, 0)
                Ennemi.setVelocity(0, randint(23, 35))
                Ennemi.z = 1
            }
        } else {
            // Spawn normal d'UN SEUL zombie (92% du temps)
            if (Math.percentChance(50)) {
                Ennemi = sprites.create(assets.image`zombie`, SpriteKind.Enemy)
                if (star_screen == 1 || _2vies == 1) {
                    Ennemi.setImage(assets.image`jokey`)
                    statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                    statusbar.attachToSprite(Ennemi)
                    statusbar.max = 2
                }
                Ennemi.setPosition(randint(0, 160), 0)
                Ennemi.setVelocity(0, randint(23, 35))
                Ennemi.z = 1
            } else if (Math.percentChance(60)) {
                Ennemi = sprites.create(assets.image`zombie 2`, SpriteKind.Enemy)
                if (star_screen == 1 || _2vies == 1) {
                    Ennemi.setImage(assets.image`mutant_2`)
                    statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                    statusbar.attachToSprite(Ennemi)
                    statusbar.max = 2
                }
                Ennemi.setPosition(randint(0, 160), 0)
                Ennemi.setVelocity(0, randint(26, 32))
                Ennemi.z = 1
            } else if (Math.percentChance(70)) {
                Ennemi = sprites.create(assets.image`zombie 3`, SpriteKind.Enemy)
                if (star_screen == 1 || _2vies == 1) {
                    Ennemi.setImage(assets.image`mutant_1`)
                    statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                    statusbar.attachToSprite(Ennemi)
                    statusbar.max = 3
                }
                Ennemi.setPosition(randint(0, 160), 0)
                Ennemi.setVelocity(0, randint(22, 33))
                Ennemi.z = 1
            } else if (Math.percentChance(80)) {
                Ennemi = sprites.create(assets.image`zombie 4`, SpriteKind.Enemy)
                if (star_screen == 1 || _2vies == 1) {
                    Ennemi.setImage(assets.image`mutant_4`)
                    statusbar = statusbars.create(0, 0, StatusBarKind.Health)
                    statusbar.attachToSprite(Ennemi)
                    statusbar.max = 2
                }
                Ennemi.setPosition(randint(0, 160), 0)
                Ennemi.setVelocity(0, randint(24, 31))
                Ennemi.z = 1
            } else if (star_screen == 1) {
            	
            }
        }
    } else if (cheat == 0 && zombie_speed == 1) {
        zombie_speed = 0
        Hard_mode = 1
        soin = 0
    }
})
forever(function () {
    if (Hard_mode == 1) {
        scene.setBackgroundImage(assets.image`Hard mod`)
        if (Math.percentChance(10)) {
            pause(100)
            Ennemi = sprites.create(assets.image`jokey`, SpriteKind.Enemy)
            statusbar = statusbars.create(0, 0, StatusBarKind.Health)
            statusbar.attachToSprite(Ennemi)
            statusbar.max = 2
            Ennemi.setVelocity(0, 30)
            if (Math.percentChance(5)) {
                Ennemi.setPosition(joueur3.x, 0)
            } else {
                Ennemi.setPosition(randint(0, 160), 0)
            }
        }
    }
})
forever(function () {
    pause(30000)
    for (let index = 0; index < 5; index++) {
        pause(50)
        sprites.destroy(zombie_death_3, effects.trail, 1000)
        pause(50)
        sprites.destroy(death_zombie_2, effects.trail, 1000)
        pause(50)
        sprites.destroy(death_zombie, effects.trail, 1000)
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.blood, effects.trail, 1000)
    for (let index = 0; index < 10; index++) {
    	
    }
})
forever(function () {
    pauseUntil(() => mort_1 == 1)
    if (modeDeJeu == 2) {
        if (mort_1 == 1) {
            pause(500)
            info.player1.setScore(0)
            munitions = 0
            pause(500)
            info.player1.setScore(zombie_killed)
            if (info.player2.life() == 0) {
                pause(1000)
                game.setGameOverScoringType(game.ScoringType.HighScore)
                game.gameOver(false)
            }
        }
    } else {
        info.player1.setScore(0)
        munitions = 0
        pause(500)
        info.player1.setScore(zombie_killed)
        pause(500)
        game.setGameOverScoringType(game.ScoringType.HighScore)
        game.gameOver(false)
    }
})
forever(function () {
    pauseUntil(() => mort_2 == 1)
    if (mort_2 == 1) {
        pause(500)
        info.player2.setScore(0)
        munition_2 = 0
        pause(500)
        info.player2.setScore(zombie_killed_2)
        if (info.player1.life() == 0) {
            pause(1000)
            game.setGameOverScoringType(game.ScoringType.HighScore)
            game.gameOver(false)
        }
    }
})
forever(function () {
    while (game_started == 0) {
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.UntilDone)
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.UntilDone)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
        pause(100)
    }
})
game.onUpdateInterval(500, function () {
    if (AI_soldier_spawned == true) {
        AI_soldier_target()
    }
})
//credits: Thomas Gagné


