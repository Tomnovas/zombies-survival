@namespace
class SpriteKind:
    med_kit = SpriteKind.create()
    munition = SpriteKind.create()
    amobox = SpriteKind.create()
    mega_zombie = SpriteKind.create()
    blood = SpriteKind.create()
    NUKe = SpriteKind.create()
    antinuke = SpriteKind.create()
    missile = SpriteKind.create()
    gros_zombie = SpriteKind.create()
    map2 = SpriteKind.create()
    explosion = SpriteKind.create()
    rocket = SpriteKind.create()
    rocket_2 = SpriteKind.create()
    joueur = SpriteKind.create()
    zombie_tueur = SpriteKind.create()
    projectile_2 = SpriteKind.create()
    helicopter = SpriteKind.create()
    humain = SpriteKind.create()
# Animation de défaite - Zombie géant attaque
def defeatAnimation():
    global cheat, munition_2, munitions
    # Arrêter les spawns
    cheat = 0
    munition_2 = 0
    munitions = 0
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    
    def on_after():
        global zombieGiant
        # Zombie géant arrive
        zombieGiant = sprites.create(assets.image("""
                gros_zombi
                """),
            SpriteKind.gros_zombie)
        zombieGiant.set_position(80, -20)
        zombieGiant.z = 110
        zombieGiant.set_scale(2, ScaleAnchor.MIDDLE)
        zombieGiant.set_velocity(0, 20)
        # Son de tremblement de terre
        music.play(music.create_sound_effect(WaveShape.NOISE,
                400,
                100,
                255,
                0,
                3000,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        music.play(music.melody_playable(music.siren),
            music.PlaybackMode.IN_BACKGROUND)
        scene.camera_shake(8, 3000)
        
        def on_after2():
            # Zombie s'arrête
            zombieGiant.set_velocity(0, 0)
            zombieGiant.set_position(80, 50)
            # Grognement du zombie géant
            music.play(music.melody_playable(music.wawawawaa),
                music.PlaybackMode.IN_BACKGROUND)
            
            def on_after3():
                # Attaque du zombie géant
                scene.camera_shake(12, 2000)
                # Son d'attaque violente
                music.play(music.melody_playable(music.power_down),
                    music.PlaybackMode.IN_BACKGROUND)
                music.play(music.create_sound_effect(WaveShape.NOISE,
                        1000,
                        200,
                        255,
                        0,
                        1000,
                        SoundExpressionEffect.NONE,
                        InterpolationCurve.LINEAR),
                    music.PlaybackMode.IN_BACKGROUND)
                
                def on_after4():
                    # Destruction des joueurs
                    sprites.destroy(joueur32, effects.disintegrate, 1000)
                    sprites.destroy(joueur23, effects.disintegrate, 1000)
                    
                    def on_after5():
                        color.start_fade_from_current(color.black)
                        
                        def on_after6():
                            # Écran de défaite
                            game.game_over(False)
                            game.set_game_over_playable(False, music.melody_playable(music.wawawawaa), False)
                            if langue == 1:
                                game.set_game_over_message(False, "VOUS-ÊTES MORT")
                            else:
                                game.set_game_over_message(False, "YOU DIED")
                            game.set_game_over_effect(False, effects.melt)
                            game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
                        timer.after(1000, on_after6)
                        
                    timer.after(2000, on_after5)
                    
                timer.after(1000, on_after4)
                
            timer.after(1500, on_after3)
            
        timer.after(3000, on_after2)
        
    timer.after(1000, on_after)
    
# Variables pour le système de vagues

def on_combos_attach_combo():
    global NUKE, cheat, zombie_speed, _2vies, caisse_deja_apparue
    if cheat == 1:
        music.play(music.melody_playable(music.magic_wand),
            music.PlaybackMode.IN_BACKGROUND)
        NUKE = 0
        info.player1.set_life(1)
        info.player2.set_life(1)
        cheat = 0
        zombie_speed = 1
        _2vies = 1
        caisse_deja_apparue = 0
controller.combos.attach_combo("uuddrlrl", on_combos_attach_combo)

def on_arrow_down_key_pressed():
    global menuSelection
    if menuActif and not (settingsOpen):
        # Son de navigation
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        menuSelection += 1
        if menuSelection > 2:
            # Retour au début
            menuSelection = 0
        if langue == 2:
            # Mise à jour visuelle
            if menuSelection == 0:
                btnPlay.set_text("> PLAY <")
                btnPlay.set_outline(0, 5)
                btnSettings.set_text("SETTINGS")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("CONTROLS")
                btnControls.set_outline(0, 1)
            elif menuSelection == 1:
                btnPlay.set_text("PLAY")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("> SETTINGS <")
                btnSettings.set_outline(0, 5)
                btnControls.set_text("CONTROLS")
                btnControls.set_outline(0, 1)
            elif menuSelection == 2:
                btnPlay.set_text("PLAY")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("SETTINGS")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("> CONTROLS <")
                btnControls.set_outline(0, 5)
        else:
            # Mise à jour visuelle
            if menuSelection == 0:
                btnPlay.set_text("> JOUER <")
                btnPlay.set_outline(0, 5)
                btnSettings.set_text("PARAMÈTRES")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("CONTROLES")
                btnControls.set_outline(0, 1)
            elif menuSelection == 1:
                btnPlay.set_text("JOUER")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text(" > PRAMÈTRES <")
                btnSettings.set_outline(0, 5)
                btnControls.set_text("CONTROLES")
                btnControls.set_outline(0, 1)
            elif menuSelection == 2:
                btnPlay.set_text("JOUER")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("PARAMÈTRES")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("> CONTROLES <")
                btnControls.set_outline(0, 5)
browserEvents.arrow_down.on_event(browserEvents.KeyEvent.PRESSED, on_arrow_down_key_pressed)

def on_player2_button_b_pressed():
    global balle_2, munition_2
    if munition_2 > 0 and mort_2 == 0:
        music.play(music.melody_playable(music.pew_pew),
            music.PlaybackMode.IN_BACKGROUND)
        balle_2 = sprites.create_projectile_from_sprite(assets.image("""
            balle_2
            """), joueur23, 0, -200)
        balle_2.set_kind(SpriteKind.projectile_2)
        munition_2 += -1
        info.player2.change_score_by(-1)
controller.player2.on_button_event(ControllerButton.B,
    ControllerButtonEvent.PRESSED,
    on_player2_button_b_pressed)

def on_on_overlap(sprite, otherSprite):
    global munitions
    if joueur32.overlaps_with(caisse_munition):
        sprites.destroy(caisse_munition)
        music.play(music.melody_playable(music.jump_up),
            music.PlaybackMode.IN_BACKGROUND)
        munitions += 25
        info.player1.set_score(munitions)
sprites.on_overlap(SpriteKind.player, SpriteKind.amobox, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    sprite2.set_velocity(0, 0)
    sprite2.set_image(assets.image("""
        caisse_à_terre
        """))
    sprite2.set_position(80, 75)
sprites.on_overlap(SpriteKind.amobox, SpriteKind.antinuke, on_on_overlap2)

def on_player1_score():
    global caisse_munition, caisse_deja_apparue
    if munitions < 5 and caisse_deja_apparue > 0:
        if langue == 1:
            joueur32.say_text("BESOIN DE BALLES!", 2000, False)
        else:
            joueur32.say_text("NEED MUNITIONS !", 2000, False)
        if mort_1 == 0:
            caisse_munition = sprites.create(assets.image("""
                    ammobox_en_air
                    """),
                SpriteKind.amobox)
            caisse_munition.set_position(80, -2)
            caisse_munition.set_velocity(0, 30)
            caisse_deja_apparue += -1
info.player1.on_score(4, on_player1_score)

def on_on_overlap3(sprite3, otherSprite3):
    global munition_2
    if joueur23.overlaps_with(caisse_munition):
        if caisse_deja_apparue > 0:
            sprites.destroy(caisse_munition)
            music.play(music.melody_playable(music.jump_up),
                music.PlaybackMode.IN_BACKGROUND)
            munition_2 += 25
            info.player2.set_score(munition_2)
sprites.on_overlap(SpriteKind.joueur, SpriteKind.amobox, on_on_overlap3)

def on_on_overlap4(joueur2, ennemi2):
    global mort_2
    if info.player2.life() < 2:
        sprites.destroy(joueur2, effects.disintegrate, 500)
        music.play(music.melody_playable(music.wawawawaa),
            music.PlaybackMode.IN_BACKGROUND)
        pause(3000)
        info.player2.change_life_by(-1)
        mort_2 = 1
    else:
        ennemi2.destroy()
        music.play(music.melody_playable(music.small_crash),
            music.PlaybackMode.IN_BACKGROUND)
        info.player2.change_life_by(-1)
sprites.on_overlap(SpriteKind.joueur, SpriteKind.enemy, on_on_overlap4)

def on_player2_button_a_pressed():
    global rocket_22, rocket_ammo_2
    if rocket_ammo_2 > 0 and mort_2 == 0:
        music.play(music.create_sound_effect(WaveShape.SQUARE,
                1500,
                800,
                255,
                0,
                300,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        rocket_22 = sprites.create_projectile_from_sprite(assets.image("""
            rocket_2
            """), joueur23, 0, -150)
        rocket_22.set_kind(SpriteKind.rocket_2)
        rocket_ammo_2 += -1
controller.player2.on_button_event(ControllerButton.A,
    ControllerButtonEvent.PRESSED,
    on_player2_button_a_pressed)

# Fonction pour afficher le texte des vagues
def showWaveText(waveNumber: number):
    global waveText, waveTextTimer
    if waveText:
        waveText.destroy()
    if langue == 1:
        waveText = textsprite.create("VAGUE " + str(waveNumber), 0, 15)
    else:
        waveText = textsprite.create("WAVE " + str(waveNumber), 0, 15)
    waveText.set_position(80, 60)
    waveText.set_flag(SpriteFlag.GHOST, True)
    waveText.z = 110
    waveTextTimer = game.runtime() + 3000
    if waveNumber == 1:
        waveText.set_outline(1, 2)
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.IN_BACKGROUND)
        # Musique vague 1 - Normale
        music.play(music.melody_playable(music.spooky),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        music.set_tempo(100)
    elif waveNumber == 2:
        waveText.set_outline(1, 4)
        music.play(music.melody_playable(music.jump_up),
            music.PlaybackMode.IN_BACKGROUND)
        effects.none.start_screen_effect(2000)
        # Musique vague 2 - Plus rapide
        music.play(music.melody_playable(music.spooky),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        music.set_tempo(130)
    elif waveNumber == 3:
        waveText.set_outline(1, 2)
        music.play(music.melody_playable(music.siren),
            music.PlaybackMode.IN_BACKGROUND)
        scene.camera_shake(4, 1000)
        # Musique vague 3 - Très rapide
        music.play(music.melody_playable(music.siren),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        music.set_tempo(160)
# Fonction pour démarrer le jeu
def startGame():
    global game_started, cheat, mort_1, mort_2, caisse_deja_apparue, zombie_killed, NUKE, zombie_speed, soin, Hard_mode, _2vies, carte, terre, joueur32, munitions, rocket_ammo_1, joueur23, munition_2, rocket_ammo_2, gameStartTime, wave2, currentWave, zombieSpawnInterval
    color.start_fade_from_current(color.black)
    game_started = 1
    cheat = 0
    # ← AJOUTEZ CETTE LIGNE
    music.set_volume(volumeMusique)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    pause(2000)
    color.start_fade_from_current(color.original_palette)
    scene.set_background_image(assets.image("""
        map
        """))
    tiles.set_current_tilemap(tilemap("""
        level2
        """))
    # Initialiser toutes les variables
    mort_1 = 0
    mort_2 = 0
    caisse_deja_apparue = 2
    zombie_killed = 0
    NUKE = 1
    zombie_speed = 0
    soin = 4
    Hard_mode = 0
    _2vies = 0
    carte = sprites.create(assets.image("""
        map2
        """), SpriteKind.map2)
    terre = sprites.create(assets.image("""
        antinuke
        """), SpriteKind.antinuke)
    terre.set_position(80, 75)
    terre.set_velocity(0, 0)
    joueur32 = sprites.create(assets.image("""
        joueur_1
        """), SpriteKind.player)
    controller.move_sprite(joueur32, 85, 85)
    joueur32.set_stay_in_screen(True)
    joueur32.z = 100
    joueur32.set_position(75, 105)
    info.player1.set_life(3)
    munitions = 50
    # 3 rockets au départ
    rocket_ammo_1 = 3
    info.player1.set_score(munitions)
    joueur23 = sprites.create(assets.image("""
        joueur_2
        """), SpriteKind.joueur)
    controller.player2.move_sprite(joueur23, 85, 85)
    joueur23.set_stay_in_screen(True)
    joueur23.z = 100
    joueur23.set_position(85, 105)
    info.player2.set_life(3)
    munition_2 = 50
    # 3 rockets au départ
    rocket_ammo_2 = 3
    info.player2.set_score(munition_2)
    pause(3000)
    # Compte à rebours 3, 2, 1
    joueur32.say_text("3", 1000, False)
    joueur23.say_text("3", 1000, False)
    pause(1000)
    joueur32.say_text("2", 1000, False)
    joueur23.say_text("2", 1000, False)
    pause(1000)
    joueur32.say_text("1", 1000, False)
    joueur23.say_text("1", 1000, False)
    pause(1000)
    gameStartTime = game.runtime()
    cheat = 1
    # Mode infini: pas de countdown
    # Le score devient le temps de survie
    if modeInfini == 0:
        # Mode normal: 3 minutes
        info.start_countdown(180)
    else:
        pass
    showWaveText(1)
    wave2 = 1
    # ASSIGNATION de la vague initiale
    currentWave = 1
    zombieSpawnInterval = getZombieSpawnInterval(1)

def on_left_pressed():
    global selectionJoueurs
    if not (choixFait2):
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        selectionJoueurs = 0
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap5(joueur3, otherSprite4):
    global munition_2
    if joueur23.overlaps_with(recharge2):
        recharge2.destroy()
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        munition_2 += 5
        info.player2.set_score(munition_2)
sprites.on_overlap(SpriteKind.joueur, SpriteKind.food, on_on_overlap5)

# Menu de sélection de difficulté
def menuDifficulte():
    global menuActif, titreDiff, optFacile, optNormal, optDifficile, optInfini
    scene.set_background_image(assets.image("""
        map
        """))
    # Son de sélection PLAY
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    # PLAY sélectionné
    menuActif = False
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    sprites.destroy_all_sprites_of_kind(SpriteKind.joueur)
    titre.destroy()
    btnPlay.destroy()
    btnSettings.destroy()
    btnControls.destroy()
    if langue == 1:
        # Titre
        titreDiff = textsprite.create("DIFFICULTER", 0, 15)
        titreDiff.set_outline(1, 2)
        titreDiff.set_position(80, 20)
        titreDiff.z = 115
        # Options
        optFacile = textsprite.create("> FACILE <", 0, 7)
        optFacile.set_position(90, 50)
        optFacile.z = 115
        optNormal = textsprite.create("NORMAL", 0, 5)
        optNormal.set_position(80, 70)
        optNormal.z = 115
        optDifficile = textsprite.create("DIFFICILE", 0, 4)
        optDifficile.set_position(80, 90)
        optDifficile.z = 115
        optInfini = textsprite.create("INFINIE", 0, 2)
        optInfini.set_position(80, 110)
        optInfini.z = 115
    else:
        # Titre
        titreDiff = textsprite.create("DIFFICULTY", 0, 15)
        titreDiff.set_outline(1, 2)
        titreDiff.set_position(80, 20)
        titreDiff.z = 115
        # Options
        optFacile = textsprite.create("> EASY <", 0, 7)
        optFacile.set_position(90, 50)
        optFacile.z = 115
        optNormal = textsprite.create("NORMAL", 0, 5)
        optNormal.set_position(80, 70)
        optNormal.z = 115
        optDifficile = textsprite.create("DIFFICULT", 0, 4)
        optDifficile.set_position(80, 90)
        optDifficile.z = 115
        optInfini = textsprite.create("INFINY", 0, 2)
        optInfini.set_position(80, 110)
        optInfini.z = 115
    
    def on_on_update():
        global choixFait
        if not choixFait:
            if langue == 1:
                # Mise à jour visuelle
                if selectionDiff == 0:
                    optFacile.set_text("> FACILE <")
                    optFacile.set_outline(0, 5)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("DIFFICILE")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("INFINIE")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 1:
                    optFacile.set_text("FACILE")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("> NORMAL <")
                    optNormal.set_outline(0, 5)
                    optDifficile.set_text("DIFFICILE")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("INFINIE")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 2:
                    optFacile.set_text("FACILE")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("> DIFFICILE <")
                    optDifficile.set_outline(0, 5)
                    optInfini.set_text("INFINIE")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 3:
                    optFacile.set_text("FACILE")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("DIFFICILE")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("> INFINIE <")
                    optInfini.set_outline(0, 5)
            else:
                if selectionDiff == 0:
                    optFacile.set_text("> EASY <")
                    optFacile.set_outline(0, 5)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("DIFFICULT")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("INFINITY")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 1:
                    optFacile.set_text("EASY")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("> NORMAL <")
                    optNormal.set_outline(0, 5)
                    optDifficile.set_text("DIFFICULT")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("INFINITY")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 2:
                    optFacile.set_text("EASY")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("> DIFFICULT <")
                    optDifficile.set_outline(0, 5)
                    optInfini.set_text("INFINITY")
                    optInfini.set_outline(0, 1)
                elif selectionDiff == 3:
                    optFacile.set_text("EASY")
                    optFacile.set_outline(0, 1)
                    optNormal.set_text("NORMAL")
                    optNormal.set_outline(0, 1)
                    optDifficile.set_text("DIFFICULT")
                    optDifficile.set_outline(0, 1)
                    optInfini.set_text("> INFINITY <")
                    optInfini.set_outline(0, 5)
    game.on_update(on_on_update)
    
    
    def on_up_pressed():
        global choixFait, selectionDiff
        if not choixFait:
            music.play(music.melody_playable(music.ba_ding),
                music.PlaybackMode.IN_BACKGROUND)
            selectionDiff -= 1
            if selectionDiff < 0:
                selectionDiff = 3
    controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)
    
    
    def on_down_pressed():
        global choixFait, selectionDiff
        if not choixFait:
            music.play(music.melody_playable(music.ba_ding),
                music.PlaybackMode.IN_BACKGROUND)
            selectionDiff += 1
            if selectionDiff > 3:
                selectionDiff = 0
    controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)
    
    
    def on_a_pressed():
        global choixFait, difficulte, modeInfini
        if not choixFait:
            choixFait = True
            music.play(music.melody_playable(music.power_up),
                music.PlaybackMode.IN_BACKGROUND)
            # Appliquer la difficulté choisie
            # Mode infini activé
            if selectionDiff == 0:
                difficulte = 0
                # Facile
                modeInfini = 0
            elif selectionDiff == 1:
                difficulte = 1
                # Normal
                modeInfini = 0
            elif selectionDiff == 2:
                difficulte = 2
                # Difficile
                modeInfini = 0
            elif selectionDiff == 3:
                difficulte = 1
                # Normal pour infini
                modeInfini = 1
            # Détruire l'interface
            titreDiff.destroy()
            optFacile.destroy()
            optNormal.destroy()
            optDifficile.destroy()
            optInfini.destroy()
            # Passer au menu de sélection 1/2 joueurs
            menuNombreJoueurs()
    controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
    

def on_countdown_end():
    global totalZombies
    info.player2.set_score(zombie_killed_2)
    info.player1.set_score(zombie_killed)
    totalZombies = zombie_killed + zombie_killed_2
    pause(500)
    if totalZombies > 75:
        # VICTOIRE - Animation scientifique
        victoryAnimation()
    else:
        # DÉFAITE - Animation zombie géant
        defeatAnimation()
info.on_countdown_end(on_countdown_end)

# Menu de sélection 1 ou 2 joueurs
# Fin correcte de la fonction menuNombreJoueurs
def menuNombreJoueurs():
    global titreJoueurs, opt1J, opt2J
    scene.set_background_image(assets.image("""
        map
        """))
    if langue == 1:
        # Titre
        titreJoueurs = textsprite.create("MODE DE JEU", 0, 15)
    else:
        # Titre
        titreJoueurs = textsprite.create("GAMEMODE", 0, 15)
    titreJoueurs.set_position(80, 30)
    titreJoueurs.z = 115
    titreJoueurs.set_outline(1, 2)
    if langue == 1:
        # Options
        opt1J = textsprite.create("> SEUL <", 0, 15)
    else:
        # Options
        opt1J = textsprite.create("> SOLO <", 0, 15)
    opt1J.set_position(60, 70)
    opt1J.z = 115
    if langue == 1:
        opt2J = textsprite.create("CO-OP", 0, 15)
    else:
        opt2J = textsprite.create("CO-OP", 0, 15)
    opt2J.set_position(100, 70)
    opt2J.z = 115
    
    def on_on_update2():
        global choixFait2
        if not choixFait2:
            # CORRECTION: Changement de 'language' à 'langue'
            if langue == 1:
                if selectionJoueurs == 0:
                    opt1J.set_text("> SEUL <")
                    opt1J.set_outline(0, 5)
                    opt2J.set_text("CO-OP")
                    opt2J.set_outline(0, 1)
                else:
                    opt1J.set_text("SEUL")
                    opt1J.set_outline(0, 1)
                    opt2J.set_text("> CO-OP <")
                    opt2J.set_outline(0, 5)
            else:
                if selectionJoueurs == 0:
                    opt1J.set_text("> SOLO <")
                    opt1J.set_outline(0, 5)
                    opt2J.set_text("DUO")
                    opt2J.set_outline(0, 1)
                else:
                    opt1J.set_text("SOLO")
                    opt1J.set_outline(0, 1)
                    opt2J.set_text("> DUO <")
                    opt2J.set_outline(0, 5)
    game.on_update(on_on_update2)
    

def on_q_key_pressed():
    global rocket2, rocket_ammo_1
    if rocket_ammo_1 > 0 and mort_1 == 0:
        music.play(music.create_sound_effect(WaveShape.SQUARE,
                1500,
                800,
                255,
                0,
                300,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        rocket2 = sprites.create_projectile_from_sprite(assets.image("""
            rocket
            """), joueur32, 0, -150)
        rocket2.set_kind(SpriteKind.rocket)
        rocket_ammo_1 += -1
browserEvents.Q.on_event(browserEvents.KeyEvent.PRESSED, on_q_key_pressed)

def on_arrow_up_key_pressed():
    global menuSelection
    if menuActif and not (settingsOpen):
        # Son de navigation
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        menuSelection += -1
        if menuSelection < 0:
            # 3 options (0, 1, 2)
            menuSelection = 2
        if langue == 2:
            # Mise à jour visuelle
            if menuSelection == 0:
                btnPlay.set_text("> PLAY <")
                btnPlay.set_outline(0, 5)
                btnSettings.set_text("SETTINGS")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("CONTROLS")
                btnControls.set_outline(0, 1)
            elif menuSelection == 1:
                btnPlay.set_text("PLAY")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("> SETTINGS <")
                btnSettings.set_outline(0, 5)
                btnControls.set_text("CONTROLS")
                btnControls.set_outline(0, 1)
            elif menuSelection == 2:
                btnPlay.set_text("PLAY")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("SETTINGS")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("> CONTROLS <")
                btnControls.set_outline(0, 5)
        else:
            # Mise à jour visuelle
            if menuSelection == 0:
                btnPlay.set_text("> JOUER <")
                btnPlay.set_outline(0, 5)
                btnSettings.set_text("PARAMÈTRES")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("CONTROLES")
                btnControls.set_outline(0, 1)
            elif menuSelection == 1:
                btnPlay.set_text("JOUER")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text(" > PRAMÈTRES <")
                btnSettings.set_outline(0, 5)
                btnControls.set_text("CONTROLES")
                btnControls.set_outline(0, 1)
            elif menuSelection == 2:
                btnPlay.set_text("JOUER")
                btnPlay.set_outline(0, 1)
                btnSettings.set_text("PARAMÈTRES")
                btnSettings.set_outline(0, 1)
                btnControls.set_text("> CONTROLES <")
                btnControls.set_outline(0, 5)
browserEvents.arrow_up.on_event(browserEvents.KeyEvent.PRESSED, on_arrow_up_key_pressed)

def on_right_pressed():
    global selectionJoueurs
    if not (choixFait2):
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        selectionJoueurs = 1
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# Fonction pour afficher le menu principal
def showMainMenu():
    global cheat, titre, btnPlay, btnSettings, btnControls, animJoueur1, animJoueur2
    cheat = 1
    music.play(music.melody_playable(music.spooky),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    scene.set_background_image(assets.image("""
        map
        """))
    # Titre du jeu
    titre = textsprite.create("ZOMBIE SURVIVAL", 0, 7)
    titre.z = 110
    titre.set_position(80, 20)
    titre.set_outline(1, 15)
    titre.set_flag(SpriteFlag.GHOST, True)
    if langue == 1:
        # Bouton Play
        btnPlay = textsprite.create("> JOUER <", 0, 5)
    else:
        # Bouton Play
        btnPlay = textsprite.create("> PLAY <", 0, 5)
    btnPlay.z = 110
    btnPlay.set_outline(1, 15)
    btnPlay.set_position(80, 70)
    btnPlay.set_flag(SpriteFlag.GHOST, True)
    if langue == 1:
        # Bouton Settings
        btnSettings = textsprite.create("PARAMÈTRES", 0, 15)
    else:
        # Bouton Settings
        btnSettings = textsprite.create("SETTINGS", 0, 15)
    btnSettings.z = 110
    btnSettings.set_position(80, 90)
    btnSettings.set_flag(SpriteFlag.GHOST, True)
    if langue == 1:
        # Bouton Contrôles (NOUVEAU)
        # Bouton Contrôles (NOUVEAU)
        # ← Sans "let"
        btnControls = textsprite.create("CONTROLES", 0, 15)
    else:
        # Bouton Contrôles (NOUVEAU)
        # Bouton Contrôles (NOUVEAU)
        # ← Sans "let"
        btnControls = textsprite.create("CONTROLS", 0, 15)
    btnControls.z = 110
    btnControls.set_position(80, 105)
    btnControls.set_flag(SpriteFlag.GHOST, True)
    # Animation des personnages
    animJoueur1 = sprites.create(assets.image("""
        joueur_1
        """), SpriteKind.player)
    animJoueur1.z = 110
    animJoueur1.set_position(40, 50)
    animJoueur1.set_flag(SpriteFlag.GHOST, True)
    animJoueur2 = sprites.create(assets.image("""
        joueur_2
        """), SpriteKind.joueur)
    animJoueur2.z = 110
    animJoueur2.set_position(120, 50)
    animJoueur2.set_flag(SpriteFlag.GHOST, True)
    # Animation de rebond
    animJoueur1.ay = 200
    animJoueur2.ay = 200
    
    def on_on_update3():
        if menuActif:
            # Animation rebond joueur 1
            if animJoueur1.y >= 50:
                animJoueur1.vy = -80
            # Animation rebond joueur 2
            if animJoueur2.y >= 50:
                animJoueur2.vy = -80
    game.on_update(on_on_update3)
    
# Animation de victoire - Scientifique sauve le monde
def victoryAnimation():
    global munition_2
    munition_2 = 0
    munition_2 = 0
    
    def on_after7():
        global helicoptere
        # Son d'hélicoptère qui arrive
        music.play(music.create_sound_effect(WaveShape.NOISE,
                2000,
                1500,
                255,
                150,
                2000,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        # Créer l'hélicoptère qui arrive
        helicoptere = sprites.create(assets.image("""
                hélicopter
                """),
            SpriteKind.helicopter)
        helicoptere.set_position(80, -20)
        helicoptere.z = 120
        helicoptere.set_velocity(0, 30)
        
        def on_after8():
            # Atterrissage de l'hélicoptère
            helicoptere.set_velocity(0, 0)
            helicoptere.set_position(80, 40)
            # Son d'atterrissage
            music.play(music.melody_playable(music.thump),
                music.PlaybackMode.IN_BACKGROUND)
            
            def on_after9():
                global scientifique
                # Scientifique sort de l'hélicoptère
                scientifique = sprites.create(assets.image("""
                        zombie_militaire
                        """),
                    SpriteKind.player)
                scientifique.set_position(80, 50)
                scientifique.z = 110
                # Voix du scientifique
                music.play(music.melody_playable(music.jump_up),
                    music.PlaybackMode.IN_BACKGROUND)
                if langue == 1:
                    scientifique.say_text("J'AI UN REMÈDE", 2000, False)
                else:
                    scientifique.say_text("I HAVE A CURE", 2000, False)
                
                def on_after10():
                    global cheat
                    # Effet de guérison - flash vert
                    scene.camera_shake(4, 2000)
                    music.play(music.melody_playable(music.magic_wand),
                        music.PlaybackMode.UNTIL_DONE)
                    music.play(music.melody_playable(music.power_up),
                        music.PlaybackMode.IN_BACKGROUND)
                    # Arrêter les spawns de zombies
                    cheat = 0
                    # Transformer tous les zombies en humains
                    for zombie in sprites.all_of_kind(SpriteKind.enemy):
                        zombie.set_image(assets.image("""
                            humain
                            """))
                        zombie.set_velocity(0, 0)
                        zombie.set_kind(SpriteKind.humain)
                        zombie.follow(helicoptere, 15)
                    
                    def on_after11():
                        color.start_fade_from_current(color.original_palette)
                        if langue == 1:
                            scientifique.say_text("J'AI SAUVÉ LE MONDE!", 2000, False)
                            
                            def on_after12():
                                joueur32.say_text("MERCI!", 1500, False)
                                joueur23.say_text("MERCI!", 1500, False)
                            timer.after(500, on_after12)
                            
                        else:
                            scientifique.say_text("I SAVED THE WORLD!", 2000, False)
                            
                            def on_after13():
                                joueur32.say_text("THANKS!", 1500, False)
                                joueur23.say_text("THANKS!", 1500, False)
                            timer.after(500, on_after13)
                            
                        # Musique de victoire épique
                        music.play(music.melody_playable(music.power_up),
                            music.PlaybackMode.UNTIL_DONE)
                        pause(1000)
                        color.start_fade_from_current(color.original_palette)
                        
                        def on_after14():
                            info.player1.set_score(zombie_killed)
                            info.player2.set_score(zombie_killed_2)
                            pause(100)
                            # Afficher l'écran de victoire
                            game.game_over(True)
                            game.set_game_over_playable(True, music.melody_playable(music.power_up), True)
                            if langue == 1:
                                game.set_game_over_message(True, "VICTOIRE! LE MONDE EST SAUVE!")
                            else:
                                game.set_game_over_message(True, "VICTORY! THE WORLD IS SAVED!")
                            game.set_game_over_effect(True, effects.confetti)
                            game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
                        timer.after(3000, on_after14)
                        
                    timer.after(2000, on_after11)
                    
                timer.after(2000, on_after10)
                
            timer.after(1000, on_after9)
            
        timer.after(2000, on_after8)
        
    timer.after(500, on_after7)
    

def on_space_key_pressed():
    global settingsOpen
    if menuActif and not (settingsOpen):
        if menuSelection == 0:
            menuDifficulte()
        elif menuSelection == 1:
            # Son de sélection SETTINGS
            music.play(music.melody_playable(music.jump_up),
                music.PlaybackMode.IN_BACKGROUND)
            # SETTINGS sélectionné
            settingsOpen = True
            showSettings(titre, btnPlay, btnSettings, animJoueur1, animJoueur2)
        elif menuSelection == 2:
            
            def on_after15():
                global settingsOpen
                # Son de sélection CONTROLES
                music.play(music.melody_playable(music.jump_up),
                    music.PlaybackMode.IN_BACKGROUND)
                # CONTROLES sélectionné
                settingsOpen = True
                showControls(titre,
                    btnPlay,
                    btnSettings,
                    btnControls,
                    animJoueur1,
                    animJoueur2)
            timer.after(500, on_after15)
            
browserEvents.space.on_event(browserEvents.KeyEvent.PRESSED, on_space_key_pressed)

def on_on_overlap6(joueur22, ennemi22):
    global mort_1
    if info.player1.life() < 2:
        sprites.destroy(joueur22, effects.disintegrate, 500)
        music.play(music.melody_playable(music.wawawawaa),
            music.PlaybackMode.IN_BACKGROUND)
        pause(3000)
        info.player1.change_life_by(-1)
        mort_1 = 1
    else:
        ennemi22.destroy()
        music.play(music.melody_playable(music.small_crash),
            music.PlaybackMode.IN_BACKGROUND)
        info.player1.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap6)

def on_on_overlap7(joueur4, recharge):
    global munitions
    if joueur32.overlaps_with(recharge):
        recharge.destroy()
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        munitions += 5
        info.player1.set_score(munitions)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap7)

# NOUVELLE COLLISION BALLE JOUEUR 2 - ZOMBIE (AJOUTÉE)

def on_on_overlap8(sprite4, otherSprite5):
    global _2vies, zombie_killed_2, med_kit2, soin, recharge2, death_zombie, death_zombie_2, zombie_death_3
    if Hard_mode == 1:
        _2vies = 1
    if star_screen == 1 or _2vies == 1:
        statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite5).value += -1
        sprites.destroy(sprite4)
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        if statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite5).value <= 0:
            sprites.destroy(otherSprite5, effects.fire, 100)
            music.play(music.melody_playable(music.small_crash),
                music.PlaybackMode.IN_BACKGROUND)
            # Score pour JOUEUR 2
            zombie_killed_2 += 1
            if Math.percent_chance(5) and soin > 0:
                med_kit2 = sprites.create(assets.image("""
                    med_kit
                    """), SpriteKind.med_kit)
                med_kit2.set_position(otherSprite5.x, otherSprite5.y)
                med_kit2.set_velocity(0, 50)
                soin += -1
            elif Math.percent_chance(40):
                recharge2 = sprites.create(assets.image("""
                    munition0
                    """), SpriteKind.food)
                recharge2.set_position(otherSprite5.x, otherSprite5.y)
                recharge2.set_velocity(0, 50)
            if goreMode == 1:
                if Math.percent_chance(33):
                    death_zombie = sprites.create(assets.image("""
                            zombie_mort 1
                            """),
                        SpriteKind.blood)
                    death_zombie.set_position(otherSprite5.x, otherSprite5.y)
                    death_zombie.set_velocity(0, 0)
                    death_zombie.z = 0
                elif Math.percent_chance(50):
                    death_zombie_2 = sprites.create(assets.image("""
                            zombie_mort 2
                            """),
                        SpriteKind.blood)
                    death_zombie_2.set_position(otherSprite5.x, otherSprite5.y)
                    death_zombie_2.set_velocity(0, 0)
                    death_zombie_2.z = 0
                else:
                    zombie_death_3 = sprites.create(assets.image("""
                            zombie_mort 3
                            """),
                        SpriteKind.blood)
                    zombie_death_3.set_position(otherSprite5.x, otherSprite5.y)
                    zombie_death_3.set_velocity(0, 0)
                    zombie_death_3.z = 0
    else:
        sprites.destroy(sprite4)
        music.play(music.melody_playable(music.small_crash),
            music.PlaybackMode.IN_BACKGROUND)
        sprites.destroy(otherSprite5, effects.fire, 100)
        # Score pour JOUEUR 2
        zombie_killed_2 += 1
        if Math.percent_chance(5) and soin > 0:
            med_kit2 = sprites.create(assets.image("""
                med_kit
                """), SpriteKind.med_kit)
            med_kit2.set_position(otherSprite5.x, otherSprite5.y)
            med_kit2.set_velocity(0, 50)
            soin += -1
        elif Math.percent_chance(40):
            recharge2 = sprites.create(assets.image("""
                munition0
                """), SpriteKind.food)
            recharge2.set_position(otherSprite5.x, otherSprite5.y)
            recharge2.set_velocity(0, 50)
        if goreMode == 1:
            if Math.percent_chance(33):
                death_zombie = sprites.create(assets.image("""
                        zombie_mort 1
                        """),
                    SpriteKind.blood)
                death_zombie.set_position(otherSprite5.x, otherSprite5.y)
                death_zombie.set_velocity(0, 0)
                death_zombie.z = 0
            elif Math.percent_chance(50):
                death_zombie_2 = sprites.create(assets.image("""
                        zombie_mort 2
                        """),
                    SpriteKind.blood)
                death_zombie_2.set_position(otherSprite5.x, otherSprite5.y)
                death_zombie_2.set_velocity(0, 0)
                death_zombie_2.z = 0
            else:
                zombie_death_3 = sprites.create(assets.image("""
                        zombie_mort 3
                        """),
                    SpriteKind.blood)
                zombie_death_3.set_position(otherSprite5.x, otherSprite5.y)
                zombie_death_3.set_velocity(0, 0)
                zombie_death_3.z = 0
sprites.on_overlap(SpriteKind.projectile_2, SpriteKind.enemy, on_on_overlap8)

# Fonction pour obtenir l'intervalle de spawn selon la vague
def getZombieSpawnInterval(wave: number):
    global baseInterval
    baseInterval = 300
    # Ajustement selon la vague
    if wave == 1:
        baseInterval = 300
    elif wave == 2:
        baseInterval = 180
    elif wave >= 3:
        baseInterval = 100
    # Ajustement selon la difficulté
    if difficulte == 0:
        # Facile - 50% plus lent
        return baseInterval + Math.floor(baseInterval * 0.5)
    elif difficulte == 1:
        # Normal - vitesse normale
        return baseInterval
    elif difficulte == 2:
        # Difficile - 40% plus rapide
        return Math.floor(baseInterval * 0.6)
    return baseInterval

def on_enter_key_pressed():
    global choixFait2, modeDeJeu
    if not (choixFait2):
        choixFait2 = True
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.IN_BACKGROUND)
        # Appliquer le mode de jeu
        if selectionJoueurs == 0:
            # Solo
            modeDeJeu = 1
        else:
            # Duo
            modeDeJeu = 2
        # Détruire l'interface
        titreJoueurs.destroy()
        opt1J.destroy()
        opt2J.destroy()
        # DÉMARRER LE JEU!
        startGame()
browserEvents.enter.on_event(browserEvents.KeyEvent.PRESSED, on_enter_key_pressed)

def on_on_overlap9(sprite5, otherSprite6):
    sprites.destroy(joueur32, effects.disintegrate, 500)
    music.play(music.melody_playable(music.wawawawaa),
        music.PlaybackMode.IN_BACKGROUND)
    pause(3000)
    info.player1.set_life(0)
sprites.on_overlap(SpriteKind.player, SpriteKind.gros_zombie, on_on_overlap9)

def on_on_overlap10(sprite6, otherSprite7):
    global star_screen, _2vies
    color.start_fade(color.original_palette, color.white)
    scene.camera_shake(10, 5000)
    sprites.destroy(otherSprite7)
    music.set_volume(250)
    music.play(music.create_sound_effect(WaveShape.NOISE,
            276,
            232,
            255,
            186,
            2000,
            SoundExpressionEffect.TREMOLO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    music.play(music.melody_playable(music.big_crash),
        music.PlaybackMode.UNTIL_DONE)
    pause(2000)
    sprites.destroy_all_sprites_of_kind(SpriteKind.blood, effects.ashes, 100)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy, effects.ashes, 100)
    color.start_fade_from_current(color.original_palette)
    music.set_volume(20)
    star_screen = 1
    _2vies = 1
    effects.star_field.start_screen_effect(30000)
    pause(30000)
    star_screen = 0
    _2vies = 0
sprites.on_overlap(SpriteKind.antinuke, SpriteKind.NUKe, on_on_overlap10)

def on_on_overlap11(sprite7, otherSprite8):
    sprites.destroy(joueur23, effects.disintegrate, 500)
    music.play(music.melody_playable(music.wawawawaa),
        music.PlaybackMode.IN_BACKGROUND)
    pause(3000)
    info.player2.set_life(0)
sprites.on_overlap(SpriteKind.joueur, SpriteKind.gros_zombie, on_on_overlap11)

def on_player1_button_b_pressed():
    global balle, munitions
    if munitions > 0 and mort_1 == 0:
        music.play(music.melody_playable(music.pew_pew),
            music.PlaybackMode.IN_BACKGROUND)
        balle = sprites.create_projectile_from_sprite(assets.image("""
            balle
            """), joueur32, 0, -200)
        balle.set_kind(SpriteKind.projectile)
        munitions += -1
        info.player1.change_score_by(-1)
controller.player1.on_button_event(ControllerButton.B,
    ControllerButtonEvent.PRESSED,
    on_player1_button_b_pressed)

def on_on_overlap12(sprite8, otherSprite9):
    if info.player1.life() < 3:
        med_kit2.destroy()
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.IN_BACKGROUND)
        info.player1.change_life_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.med_kit, on_on_overlap12)

def on_on_overlap13(sprite9, otherSprite10):
    if info.player2.life() < 3:
        med_kit2.destroy()
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.IN_BACKGROUND)
        info.player2.change_life_by(1)
sprites.on_overlap(SpriteKind.joueur, SpriteKind.med_kit, on_on_overlap13)

def on_player2_score():
    global caisse_munition, caisse_deja_apparue
    if munition_2 < 5 and caisse_deja_apparue > 0:
        if langue == 1:
            joueur23.say_text("BESOIN DE BALLES!", 2000, False)
        else:
            joueur23.say_text("NEED MUNITIONS !", 2000, False)
        if mort_2 == 0:
            caisse_munition = sprites.create(assets.image("""
                    ammobox_en_air
                    """),
                SpriteKind.amobox)
            caisse_munition.set_position(80, -2)
            caisse_munition.set_velocity(0, 30)
            caisse_deja_apparue += -1
info.player2.on_score(4, on_player2_score)

# COLLISION BALLE JOUEUR 1 - ZOMBIE (CORRIGÉE)

def on_on_overlap14(sprite10, otherSprite11):
    global _2vies, zombie_killed, med_kit2, soin, recharge2, death_zombie, death_zombie_2, zombie_death_3
    if Hard_mode == 1:
        _2vies = 1
    if star_screen == 1 or _2vies == 1:
        statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite11).value += -1
        sprites.destroy(sprite10)
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.IN_BACKGROUND)
        if statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite11).value <= 0:
            sprites.destroy(otherSprite11, effects.fire, 100)
            music.play(music.melody_playable(music.small_crash),
                music.PlaybackMode.IN_BACKGROUND)
            # Score pour JOUEUR 1
            zombie_killed += 1
            if Math.percent_chance(5) and soin > 0:
                med_kit2 = sprites.create(assets.image("""
                    med_kit
                    """), SpriteKind.med_kit)
                med_kit2.set_position(otherSprite11.x, otherSprite11.y)
                med_kit2.set_velocity(0, 50)
                soin += -1
            elif Math.percent_chance(40):
                recharge2 = sprites.create(assets.image("""
                    munition0
                    """), SpriteKind.food)
                recharge2.set_position(otherSprite11.x, otherSprite11.y)
                recharge2.set_velocity(0, 50)
            if goreMode == 1:
                if Math.percent_chance(33):
                    death_zombie = sprites.create(assets.image("""
                            zombie_mort 1
                            """),
                        SpriteKind.blood)
                    death_zombie.set_position(otherSprite11.x, otherSprite11.y)
                    death_zombie.set_velocity(0, 0)
                    death_zombie.z = 0
                elif Math.percent_chance(50):
                    death_zombie_2 = sprites.create(assets.image("""
                            zombie_mort 2
                            """),
                        SpriteKind.blood)
                    death_zombie_2.set_position(otherSprite11.x, otherSprite11.y)
                    death_zombie_2.set_velocity(0, 0)
                    death_zombie_2.z = 0
                else:
                    zombie_death_3 = sprites.create(assets.image("""
                            zombie_mort 3
                            """),
                        SpriteKind.blood)
                    zombie_death_3.set_position(otherSprite11.x, otherSprite11.y)
                    zombie_death_3.set_velocity(0, 0)
                    zombie_death_3.z = 0
    else:
        sprites.destroy(sprite10)
        music.play(music.melody_playable(music.small_crash),
            music.PlaybackMode.IN_BACKGROUND)
        sprites.destroy(otherSprite11, effects.fire, 100)
        # Score pour JOUEUR 1
        zombie_killed += 1
        if Math.percent_chance(5) and soin > 0:
            med_kit2 = sprites.create(assets.image("""
                med_kit
                """), SpriteKind.med_kit)
            med_kit2.set_position(otherSprite11.x, otherSprite11.y)
            med_kit2.set_velocity(0, 50)
            soin += -1
        elif Math.percent_chance(40):
            recharge2 = sprites.create(assets.image("""
                munition0
                """), SpriteKind.food)
            recharge2.set_position(otherSprite11.x, otherSprite11.y)
            recharge2.set_velocity(0, 50)
        if goreMode == 1:
            if Math.percent_chance(33):
                death_zombie = sprites.create(assets.image("""
                        zombie_mort 1
                        """),
                    SpriteKind.blood)
                death_zombie.set_position(otherSprite11.x, otherSprite11.y)
                death_zombie.set_velocity(0, 0)
                death_zombie.z = 0
            elif Math.percent_chance(50):
                death_zombie_2 = sprites.create(assets.image("""
                        zombie_mort 2
                        """),
                    SpriteKind.blood)
                death_zombie_2.set_position(otherSprite11.x, otherSprite11.y)
                death_zombie_2.set_velocity(0, 0)
                death_zombie_2.z = 0
            else:
                zombie_death_3 = sprites.create(assets.image("""
                        zombie_mort 3
                        """),
                    SpriteKind.blood)
                zombie_death_3.set_position(otherSprite11.x, otherSprite11.y)
                zombie_death_3.set_velocity(0, 0)
                zombie_death_3.z = 0
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap14)

# COLLISION ROCKET JOUEUR 1 - ZOMBIE (EXPLOSION ZONE)

def on_on_overlap15(sprite11, otherSprite12):
    global explosion2, distance, zombie_killed, med_kit2, soin, recharge2
    # Explosion visuelle
    explosion2 = sprites.create(assets.image("""
            explosion
            """),
        SpriteKind.explosion)
    explosion2.set_position(sprite11.x, sprite11.y)
    explosion2.lifespan = 500
    # Son d'explosion
    music.play(music.melody_playable(music.big_crash),
        music.PlaybackMode.IN_BACKGROUND)
    scene.camera_shake(6, 300)
    # ZONE D'EXPLOSION - Détruit tous les zombies proches
    for zombie2 in sprites.all_of_kind(SpriteKind.enemy):
        distance = abs(zombie2.x - explosion2.x) + abs(zombie2.y - explosion2.y)
        if distance < 40:
            sprites.destroy(zombie2, effects.fire, 100)
            zombie_killed += 1
            # Drops possibles
            if Math.percent_chance(10) and soin > 0:
                med_kit2 = sprites.create(assets.image("""
                    med_kit
                    """), SpriteKind.med_kit)
                med_kit2.set_position(zombie2.x, zombie2.y)
                med_kit2.set_velocity(0, 50)
                soin += -1
            elif Math.percent_chance(30):
                recharge2 = sprites.create(assets.image("""
                    munition0
                    """), SpriteKind.food)
                recharge2.set_position(zombie2.x, zombie2.y)
                recharge2.set_velocity(0, 50)
    # Détruire la rocket
    sprites.destroy(sprite11, effects.fire, 100)
sprites.on_overlap(SpriteKind.rocket, SpriteKind.enemy, on_on_overlap15)

# COLLISION ROCKET JOUEUR 2 - ZOMBIE (EXPLOSION ZONE)

def on_on_overlap16(sprite12, otherSprite13):
    global explosion3, distance2, zombie_killed_2, med_kit2, soin, recharge2
    # Explosion visuelle
    explosion3 = sprites.create(assets.image("""
            explosion
            """),
        SpriteKind.explosion)
    explosion3.set_position(sprite12.x, sprite12.y)
    explosion3.lifespan = 500
    # Son d'explosion
    music.play(music.melody_playable(music.big_crash),
        music.PlaybackMode.IN_BACKGROUND)
    scene.camera_shake(6, 300)
    # ZONE D'EXPLOSION - Détruit tous les zombies proches
    for zombie3 in sprites.all_of_kind(SpriteKind.enemy):
        distance2 = abs(zombie3.x - explosion3.x) + abs(zombie3.y - explosion3.y)
        if distance2 < 40:
            sprites.destroy(zombie3, effects.fire, 100)
            zombie_killed_2 += 1
            # Drops possibles
            if Math.percent_chance(10) and soin > 0:
                med_kit2 = sprites.create(assets.image("""
                    med_kit
                    """), SpriteKind.med_kit)
                med_kit2.set_position(zombie3.x, zombie3.y)
                med_kit2.set_velocity(0, 50)
                soin += -1
            elif Math.percent_chance(30):
                recharge2 = sprites.create(assets.image("""
                    munition0
                    """), SpriteKind.food)
                recharge2.set_position(zombie3.x, zombie3.y)
                recharge2.set_velocity(0, 50)
    # Détruire la rocket
    sprites.destroy(sprite12, effects.fire, 100)
sprites.on_overlap(SpriteKind.rocket_2, SpriteKind.enemy, on_on_overlap16)

bomb: Sprite = None
statusbar: StatusBarSprite = None
Ennemi: Sprite = None
offsetX = 0
positionGroupe = 0
nombreZombies = 0
lastZombieSpawnTime = 0
newWave = 0
elapsedTime = 0
distance2 = 0
explosion3: Sprite = None
distance = 0
explosion2: Sprite = None
balle: Sprite = None
baseInterval = 0
zombie_death_3: Sprite = None
death_zombie_2: Sprite = None
death_zombie: Sprite = None
med_kit2: Sprite = None
star_screen = 0
scientifique: Sprite = None
helicoptere: Sprite = None
rocket2: Sprite = None
titreJoueurs: TextSprite = None
totalZombies = 0
zombie_killed_2 = 0
recharge2: Sprite = None
currentWave = 0
wave2 = 0
gameStartTime = 0
rocket_ammo_1 = 0
terre: Sprite = None
carte: Sprite = None
Hard_mode = 0
soin = 0
zombie_killed = 0
waveTextTimer = 0
rocket_22: Sprite = None
rocket_ammo_2 = 0
mort_1 = 0
caisse_munition: Sprite = None
balle_2: Sprite = None
mort_2 = 0
menuSelection = 0
caisse_deja_apparue = 0
_2vies = 0
zombie_speed = 0
NUKE = 0
joueur23: Sprite = None
joueur32: Sprite = None
zombieGiant: Sprite = None
munitions = 0
munition_2 = 0
cheat = 0
game_started = 0
zombieSpawnInterval = 0
modeDeJeu = 0
selectionDiff = 0
choixFait = False
selectionJoueurs = 0
choixFait2 = False
# 0 = Désactivé, 1 = Activé pour joueur 1
minigunActif_1 = 0
# 0 = Désactivé, 1 = Activé pour joueur 2
minigunActif_2 = 0
# 0 = Mode normal (3 min), 1 = Mode infini
modeInfini = 0
volumeMusique = 0
scientifique2 = None
helicoptere2 = None
zombieGiant2 = None
settingsOpen = False
waveText: TextSprite = None
otherSprite14 = None
titre: TextSprite = None
btnPlay: TextSprite = None
btnControls: TextSprite = None
btnSettings: TextSprite = None
animJoueur1: Sprite = None
animJoueur2: Sprite = None
# Position dans le menu settings (0=Volume, 1=Gore, 2=Retour)
settingsSelection = 0
goreMode = 0
menuActif = False
difficulte = 0
titreDiff: TextSprite = None
optFacile: TextSprite = None
optNormal: TextSprite = None
optDifficile: TextSprite = None
optInfini: TextSprite = None
opt1J: TextSprite = None
opt2J: TextSprite = None
langue = 0
# 1 = Français, 2 = English
langue = 1
# 1 = Solo, 2 = Duo
modeDeJeu = 2
# 0 = Facile, 1 = Normal, 2 = Difficile
difficulte = 1
# Volume de 0 à 100
volumeMusique = 100
# 1 = Activé, 0 = Désactivé
goreMode = 1
def showSettings(titre2: TextSprite, btnPlay2: TextSprite, btnSettings2: TextSprite, animJ1: Sprite, animJ2: Sprite):
    # Cacher le menu principal
    titre2.set_flag(SpriteFlag.INVISIBLE, True)
    btnPlay2.set_flag(SpriteFlag.INVISIBLE, True)
    btnSettings2.set_flag(SpriteFlag.INVISIBLE, True)
    btnControls.set_flag(SpriteFlag.INVISIBLE, True)
    animJ1.set_flag(SpriteFlag.INVISIBLE, True)
    animJ2.set_flag(SpriteFlag.INVISIBLE, True)
    scene.set_background_image(assets.image("""
        map
        """))
    # Titre
    titreSettings = textsprite.create("=== PARAMETRES ===", 0, 15)
    titreSettings.set_position(80, 20)
    titreSettings.z = 115
    # Options
    optVolume = textsprite.create("> Volume: " + str(volumeMusique), 0, 5)
    optVolume.set_position(80, 50)
    optVolume.z = 115
    optGore = textsprite.create("Gore: " + str(("ON" if goreMode == 1 else "OFF")), 0, 1)
    optGore.set_position(80, 70)
    optGore.z = 115
    optLangue = textsprite.create("Langue: " + str(("FRANCAIS" if langue == 1 else "ENGLISH")),
        0,
        1)
    optLangue.set_position(80, 90)
    optLangue.z = 115
    optRetour = textsprite.create("RETOUR", 0, 1)
    optRetour.set_position(80, 110)
    optRetour.z = 115
    selectionSettings = 0
    settingsActif = True
    # Boucle de sélection
    
    def on_on_update4():
        if settingsActif:
            # Mise à jour visuelle
            if selectionSettings == 0:
                optVolume.set_text("> Volume: " + str(volumeMusique) + " <")
                optVolume.set_outline(0, 5)
                optGore.set_text("Gore: " + str(("ON" if goreMode == 1 else "OFF")))
                optGore.set_outline(0, 1)
                optLangue.set_text("Langue: " + str(("FRANCAIS" if langue == 1 else "ENGLISH")))
                optLangue.set_outline(0, 1)
                optRetour.set_text("RETOUR")
                optRetour.set_outline(0, 1)
            elif selectionSettings == 1:
                optVolume.set_text("Volume: " + str(volumeMusique))
                optVolume.set_outline(0, 1)
                optGore.set_text("> Gore: " + str(("ON" if goreMode == 1 else "OFF")) + " <")
                optGore.set_outline(0, 5)
                optLangue.set_text("Langue: " + str(("FRANCAIS" if langue == 1 else "ENGLISH")))
                optLangue.set_outline(0, 1)
                optRetour.set_text("RETOUR")
                optRetour.set_outline(0, 1)
            elif selectionSettings == 2:
                optVolume.set_text("Volume: " + str(volumeMusique))
                optVolume.set_outline(0, 1)
                optGore.set_text("Gore: " + str(("ON" if goreMode == 1 else "OFF")))
                optGore.set_outline(0, 1)
                optLangue.set_text("> Langue: " + str(("FRANCAIS" if langue == 1 else "ENGLISH")) + " <")
                optLangue.set_outline(0, 5)
                optRetour.set_text("RETOUR")
                optRetour.set_outline(0, 1)
            elif selectionSettings == 3:
                optVolume.set_text("Volume: " + str(volumeMusique))
                optVolume.set_outline(0, 1)
                optGore.set_text("Gore: " + str(("ON" if goreMode == 1 else "OFF")))
                optGore.set_outline(0, 1)
                optLangue.set_text("Langue: " + str(("FRANCAIS" if langue == 1 else "ENGLISH")))
                optLangue.set_outline(0, 1)
                optRetour.set_text("> RETOUR <")
                optRetour.set_outline(0, 5)
    game.on_update(on_on_update4)
    
    # Navigation HAUT
    
    def on_up_pressed2():
        nonlocal selectionSettings
        if settingsActif:
            music.play(music.melody_playable(music.ba_ding),
                music.PlaybackMode.IN_BACKGROUND)
            selectionSettings -= 1
            if selectionSettings < 0:
                selectionSettings = 3
    controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed2)
    
    # Navigation BAS
    
    def on_down_pressed2():
        nonlocal selectionSettings
        if settingsActif:
            music.play(music.melody_playable(music.ba_ding),
                music.PlaybackMode.IN_BACKGROUND)
            selectionSettings += 1
            if selectionSettings > 3:
                selectionSettings = 0
    controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed2)
    
    # Navigation GAUCHE - Diminuer
    
    def on_left_pressed2():
        global volumeMusique, goreMode, langue
        if settingsActif:
            music.play(music.melody_playable(music.knock),
                music.PlaybackMode.IN_BACKGROUND)
            if selectionSettings == 0:
                # Volume -10
                volumeMusique -= 10
                if volumeMusique < 0:
                    volumeMusique = 0
                music.set_volume(volumeMusique)
            elif selectionSettings == 1:
                # Gore OFF
                goreMode = 0
            elif selectionSettings == 2:
                # Langue: Français
                langue = 1
    controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed2)
    
    # Navigation DROITE - Augmenter
    
    def on_right_pressed2():
        global volumeMusique, goreMode, langue
        if settingsActif:
            music.play(music.melody_playable(music.knock),
                music.PlaybackMode.IN_BACKGROUND)
            if selectionSettings == 0:
                # Volume +10
                volumeMusique += 10
                if volumeMusique > 100:
                    volumeMusique = 100
                music.set_volume(volumeMusique)
            elif selectionSettings == 1:
                # Gore ON
                goreMode = 1
            elif selectionSettings == 2:
                # Langue: English
                langue = 2
    controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed2)
    
    # Validation avec A
    
    def on_a_pressed2():
        nonlocal settingsActif
        global settingsOpen, menuActif
        if settingsActif and selectionSettings == 3:
            # RETOUR sélectionné
            settingsActif = False
            music.play(music.melody_playable(music.power_up),
                music.PlaybackMode.IN_BACKGROUND)
            # Détruire l'interface
            titreSettings.destroy()
            optVolume.destroy()
            optGore.destroy()
            optLangue.destroy()
            optRetour.destroy()
            # Restaurer le menu principal
            settingsOpen = False
            menuActif = True
            titre2.set_flag(SpriteFlag.INVISIBLE, False)
            btnPlay2.set_flag(SpriteFlag.INVISIBLE, False)
            btnSettings2.set_flag(SpriteFlag.INVISIBLE, False)
            btnControls.set_flag(SpriteFlag.INVISIBLE, False)
            animJ1.set_flag(SpriteFlag.INVISIBLE, False)
            animJ2.set_flag(SpriteFlag.INVISIBLE, False)
    controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed2)
    
def showControls(titre3: TextSprite, btnPlay3: TextSprite, btnSettings3: TextSprite, btnControls2: TextSprite, animJ12: Sprite, animJ22: Sprite):
    global settingsOpen
    # Cacher le menu principal
    titre3.set_flag(SpriteFlag.INVISIBLE, True)
    btnPlay3.set_flag(SpriteFlag.INVISIBLE, True)
    btnSettings3.set_flag(SpriteFlag.INVISIBLE, True)
    btnControls2.set_flag(SpriteFlag.INVISIBLE, True)
    animJ12.set_flag(SpriteFlag.INVISIBLE, True)
    animJ22.set_flag(SpriteFlag.INVISIBLE, True)
    # Afficher les contrôles détaillés
    game.show_long_text("CONTROLES\\nJOUEUR 1:\\nDéplacer: WASD\\n Tirer balle: E\\n Tirer rocket: Q\\nJOUEUR 2:\\n Déplacer: IJKL\\n Tirer balle: O\\n Tirer rocket: U\\n OBJECTIF\\nSurvivez 3 minutes\\nTuez 75+ zombies\\n Appuyez A pour retour",
        DialogLayout.FULL)
    # Retour au menu
    settingsOpen = False
    titre3.set_flag(SpriteFlag.INVISIBLE, False)
    btnPlay3.set_flag(SpriteFlag.INVISIBLE, False)
    btnSettings3.set_flag(SpriteFlag.INVISIBLE, False)
    btnControls2.set_flag(SpriteFlag.INVISIBLE, False)
    animJ12.set_flag(SpriteFlag.INVISIBLE, False)
    animJ22.set_flag(SpriteFlag.INVISIBLE, False)
menuActif = True
zombieSpawnInterval = 500
game_started = 0
# <--- Déclaration globale unique
music.set_volume(100)
# Démarrer le jeu avec le menu
showMainMenu()
# *** LIGNES REDONDANTES SUPPRIMÉES ICI POUR CORRIGER LES ERREURS ***
# Système de gestion des vagues basé sur le temps

def on_on_update5():
    global elapsedTime, newWave, currentWave, zombieSpawnInterval
    elapsedTime = Math.floor((game.runtime() - gameStartTime) / 1000)
    newWave = Math.floor(elapsedTime / 60) + 1
    # Limiter à 3 vagues maximum
    if newWave > 3:
        newWave = 3
    if newWave != currentWave and newWave <= 3:
        if wave2 == 1:
            currentWave = newWave
            zombieSpawnInterval = getZombieSpawnInterval(currentWave)
            showWaveText(currentWave)
game.on_update(on_on_update5)

# Gestion de la destruction du texte de vague après 3 secondes

def on_on_update6():
    global waveText
    if waveText and game.runtime() >= waveTextTimer:
        waveText.destroy()
        waveText = None
game.on_update(on_on_update6)

def on_on_update7():
    global lastZombieSpawnTime, nombreZombies, positionGroupe, offsetX, Ennemi, statusbar, zombie_speed, Hard_mode, soin
    if cheat == 1 and game.runtime() - lastZombieSpawnTime >= zombieSpawnInterval:
        lastZombieSpawnTime = game.runtime()
        # 8% de chance de spawner un GROUPE de zombies
        if Math.percent_chance(8):
            # Groupe de 3 à 6 zombies
            nombreZombies = randint(3, 6)
            # Position centrale du groupe
            positionGroupe = randint(20, 140)
            for index in range(nombreZombies):
                # Créer un zombie avec une légère variation de position
                offsetX = randint(-15, 15)
                if Math.percent_chance(50):
                    Ennemi = sprites.create(assets.image("""
                        zombie
                        """), SpriteKind.enemy)
                elif Math.percent_chance(60):
                    Ennemi = sprites.create(assets.image("""
                        zombie 2
                        """), SpriteKind.enemy)
                elif Math.percent_chance(70):
                    Ennemi = sprites.create(assets.image("""
                        zombie 3
                        """), SpriteKind.enemy)
                else:
                    Ennemi = sprites.create(assets.image("""
                        zombie 4
                        """), SpriteKind.enemy)
                if star_screen == 1 or _2vies == 1:
                    statusbar = statusbars.create(0, 0, StatusBarKind.health)
                    statusbar.attach_to_sprite(Ennemi)
                    statusbar.max = 2
                Ennemi.set_position(positionGroupe + offsetX, 0)
                Ennemi.set_velocity(0, randint(23, 35))
                Ennemi.z = 1
            music.play(music.melody_playable(music.jump_down),
                music.PlaybackMode.IN_BACKGROUND)
        else:
            # Spawn normal d'UN SEUL zombie (92% du temps)
            if Math.percent_chance(50):
                Ennemi = sprites.create(assets.image("""
                    zombie
                    """), SpriteKind.enemy)
                if star_screen == 1 or _2vies == 1:
                    statusbar = statusbars.create(0, 0, StatusBarKind.health)
                    statusbar.attach_to_sprite(Ennemi)
                    statusbar.max = 2
                Ennemi.set_position(randint(0, 160), 0)
                Ennemi.set_velocity(0, randint(23, 35))
                Ennemi.z = 1
            elif Math.percent_chance(60):
                Ennemi = sprites.create(assets.image("""
                    zombie 2
                    """), SpriteKind.enemy)
                if star_screen == 1 or _2vies == 1:
                    statusbar = statusbars.create(0, 0, StatusBarKind.health)
                    statusbar.attach_to_sprite(Ennemi)
                    statusbar.max = 2
                Ennemi.set_position(randint(0, 160), 0)
                Ennemi.set_velocity(0, randint(26, 32))
                Ennemi.z = 1
            elif Math.percent_chance(70):
                Ennemi = sprites.create(assets.image("""
                    zombie 3
                    """), SpriteKind.enemy)
                if star_screen == 1 or _2vies == 1:
                    statusbar = statusbars.create(0, 0, StatusBarKind.health)
                    statusbar.attach_to_sprite(Ennemi)
                    statusbar.max = 2
                Ennemi.set_position(randint(0, 160), 0)
                Ennemi.set_velocity(0, randint(22, 33))
                Ennemi.z = 1
            else:
                Ennemi = sprites.create(assets.image("""
                    zombie 4
                    """), SpriteKind.enemy)
                if star_screen == 1 or _2vies == 1:
                    statusbar = statusbars.create(0, 0, StatusBarKind.health)
                    statusbar.attach_to_sprite(Ennemi)
                    statusbar.max = 2
                Ennemi.set_position(randint(0, 160), 0)
                Ennemi.set_velocity(0, randint(24, 31))
                Ennemi.z = 1
    elif cheat == 0 and zombie_speed == 1:
        zombie_speed = 0
        Hard_mode = 1
        soin = 0
game.on_update(on_on_update7)

def on_on_update8():
    global NUKE, bomb
    if (zombie_killed == 50 or zombie_killed_2 == 50) and NUKE == 1:
        NUKE = 0
        joueur32.say_text("NUKE", 5000, False)
        music.play(music.create_sound_effect(WaveShape.SQUARE,
                2033,
                1110,
                244,
                0,
                1500,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        bomb = sprites.create(assets.image("""
            nuke
            """), SpriteKind.NUKe)
        bomb.set_position(80, 0)
        bomb.set_velocity(0, 40)
game.on_update(on_on_update8)

# Détruire les zombies qui sortent de l'écran

def on_on_update9():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        if value.y > 125:
            sprites.destroy(value)
game.on_update(on_on_update9)

def on_forever():
    global Ennemi, statusbar
    if Hard_mode == 1:
        scene.set_background_image(assets.image("""
            Hard mod
            """))
        if Math.percent_chance(10):
            pause(100)
            Ennemi = sprites.create(assets.image("""
                jokey
                """), SpriteKind.enemy)
            statusbar = statusbars.create(0, 0, StatusBarKind.health)
            statusbar.attach_to_sprite(Ennemi)
            statusbar.max = 2
            Ennemi.set_velocity(0, 30)
            if Math.percent_chance(5):
                Ennemi.set_position(joueur32.x, 0)
            else:
                Ennemi.set_position(randint(0, 160), 0)
forever(on_forever)

def on_forever2():
    for index2 in range(10):
        pause(30000)
        for index3 in range(5):
            pause(50)
            sprites.destroy(zombie_death_3, effects.trail, 1000)
            pause(75)
            sprites.destroy(death_zombie_2, effects.trail, 1000)
            pause(100)
            sprites.destroy(death_zombie, effects.trail, 1000)
        sprites.destroy_all_sprites_of_kind(SpriteKind.blood, effects.trail, 1000)
forever(on_forever2)

def on_forever3():
    global munitions
    
    def on_pause_until():
        pass
    pause_until(on_pause_until)
    
    if mort_1 == 1:
        pause(500)
        info.player1.set_score(0)
        munitions = 0
        pause(500)
        info.player1.set_score(zombie_killed)
        if info.player2.life() == 0:
            pause(1000)
            game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
            game.game_over(False)
forever(on_forever3)

def on_forever4():
    global munition_2
    
    def on_pause_until2():
        pass
    pause_until(on_pause_until2)
    
    if mort_2 == 1:
        pause(500)
        info.player2.set_score(0)
        munition_2 = 0
        pause(500)
        info.player2.set_score(zombie_killed_2)
        if info.player1.life() == 0:
            pause(1000)
            game.set_game_over_scoring_type(game.ScoringType.HIGH_SCORE)
            game.game_over(False)
forever(on_forever4)

def on_forever5():
    while game_started == 0:
        music.play(music.melody_playable(music.jump_up),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.melody_playable(music.power_down),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.melody_playable(music.jump_down),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.UNTIL_DONE)
        pause(100)
forever(on_forever5)
