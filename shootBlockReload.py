class Player:
    """STATUS
    0 = READY
    1 = SHOOT
    2 = BLOCK
    3 = RELOAD
    -1 = MISFIRE"""
    def __init__(self, number):
        self.number = number
        self.bullets = 0
        self.status = 0  # ready
        self.target = self  # no one
        self.lives = 1
        self.round_wins = 0
        self.round_losses = 0
        self.is_living = True

    def shoot(self):
        if self.bullets >= 1:
            self.bullets -= 1
            print("Player {} has chosen to shoot player {}!".format(self.number, self.target.number))
        else:
            print("Player {} has no bullets to shoot player {} with!".format(self.number, self.target.number))
            self.status = -1
            self.flinch()

    def block(self):
        print("Player {} has chosen to block player {}!".format(self.number,self.target.number))

    def reload(self):
        self.bullets += 1
        print("Player {} has chosen to reload!".format(self.number))

    def flinch(self):
        print("Player {} has hesitated for too long!".format(self.number))

    def is_shot(self, shooter):
        self.lives -= 1
        if self.lives > 0:
            print("Player {} has been shot by player {}".format(self.number, shooter))
            print("Player {} has {} lives remaining!".format(self.number, self.lives))
        else:
            print("Player {} has been eliminated by player {}".format(self.number, shooter))


    def is_blocked(self):
        print("Player {}'s shot has been blocked by player {}!".format(self.number, self.target.number))


    def is_countered(self):
        print("Player {}'s bullets have collided with someone else's".format(self.number, self.target.number))

    def is_foolish(self):
        print("Player {} almost shot themselves!".format(self.number))

    def is_crazy(self):
        print("Player {} has tried to shoot the dead!".format(self.number))

    def is_rotting(self):
        print("Player {} is rotting!".format(self.number))

    def is_alive(self):
        if self.lives <= 0:
            self.is_living = False
            return False
        return True


    def reset(self):
        self.__init__(self.number)


class Game:
    def __init__(self, players):
        self.players = players
        self.living_players = players
        self.survivor_count = len(players)
        self.shooting_targets = {}
        self.blocking_targets = {}
        self.game_over = False

        for player in self.players:
            print("Player {} is ready to battle!".format(player.number))


    def player_option(self, player):
        print("What will player {} do?".format(player.number))
        choice = int(input())
        if choice < 0 or choice > 3:
            return -1
        else:
            return choice

    def player_target(self, player): # this is the one that is broken, always returns -1
        print("Who will player {} face?".format(player.number))
        choice = int(input())
        if choice >= 0 and choice < len(self.players):
            return choice
        else:
            return -1

    def start_round(self, round_number):
        player_no = 0
        print("Round {}. Start!".format(round_number))
        for player in self.players:
            if player.is_alive():
                player.status = self.player_option(player)
                if len(self.players) > 2:
                    if player.status == 1 or player.status == 2:
                        target_number = self.player_target(player)
                        if target_number == -1:
                            player.status = -1
                            player.target = player
                        else:
                            player.target = self.players[target_number]
                    else:
                        player.target = player
                else:
                    if player_no == 0:
                        player.target = self.living_players[1]
                        player_no = 1
                    else:
                        player.target = self.living_players[0]



    def display_round(self):
        for player in self.players:
            if player.is_alive():
                self.event_handler(player)

    def event_handler(self, player):
        if player.status == 1:
            player.shoot()
        elif player.status == 2:
            player.block()
        elif player.status == 3:
            player.reload()
        else:
            player.flinch()

    def evaluate_round(self):

        for player in self.players:
            if player.status == 1 and player.target.is_alive():
                if not player.is_living:
                    player.is_rotting()
                elif player == player.target:
                    player.is_foolish()
                elif player.target.status == 1 and player.target.target == player:
                    player.is_countered()
                elif player.target.status == 2 and player.target.target == player:
                    player.is_blocked()
                else:
                    player.target.is_shot(player.number)

            elif not player.target.is_alive() and player.status == 1:
                player.is_crazy()

    def elimination_check(self):
        self.survivor_count = len(self.players)
        alive_players = []
        for player in self.players:
            if not player.is_alive():
                self.survivor_count -= 1
                player.status = -1
                player.target = player
            else:
                alive_players.append(player)
        if len(alive_players) == 1:
            print("Victory belongs to player {}! Game over.".format(alive_players[0].number))
            self.game_over = True
        elif len(alive_players) == 0:
            print("None remain. Game over.")
            self.game_over = True

    def game_over_check(self):
        if self.game_over:
            return True
        return False

    def reset(self):
        self.__init__(self.players)

    def play(self):
        i = 0
        while not self.game_over:
            self.start_round(i)
            self.display_round()
            self.evaluate_round()
            self.elimination_check()
            self.game_over = self.game_over_check()
            i += 1
        print("Do you want to play again? Y/N")
        ans = input()
        if ans.upper() == "Y":
            for player in self.players:
                player.reset()
            self.reset()
            self.play()
        else:
            return 0


jack = Player(0)
serena = Player(1)
sam = Player(2)


game1 = Game([jack,serena,sam])
game1.play()

