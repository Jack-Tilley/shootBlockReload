class Player:
    """STATUS
    0 = READY
    1 = SHOOT
    2 = BLOCK
    3 = RELOAD
    4 = DEFEATED
    -1 = MISFIRE"""
    def __init__(self, number):
        self.number = number
        self.bullets = 0
        self.status = 0  # ready
        self.target = 0 # no one
        self.lives = 3
        self.round_wins = 0
        self.round_losses = 0

    def shoot(self):
        if self.bullets >= 1:
            self.bullets -= 1
            print("Player {} has chosen to shoot player {}!".format(self.number,self.target))
        else:
            print("Player {} has no bullets to shoot player {} with!".format(self.number, self.target))

    def block(self):
        print("Player {} has chosen to block player {}!".format(self.number,self.target))

    def reload(self):
        self.bullets += 1
        print("Player {} has chosen to reload!".format(self.number))

    def flinch(self):
        print("Player {} has hesitated for too long!".format(self.number))

    def is_shot(self):
        self.lives -= 1
        if self.lives <= 0:
            print("Player {} has been defeated!".format(self.number))
        else:
            print("Player {} has {} lives remaining!".format(self.number, self.lives))

    def is_blocked(self):
        print("Player {} has blocked a shot by {}!".format(self.number, self.target))

    # def has_been_defeated(self):
    #     if self.lives == 0:
    #         print("Player {} has been defeated!".format(self.number))

    def reset(self):
        self.__init__(self.number)


class Game:
    def __init__(self, players):
        self.players = players

        for player in self.players:
            print("Player {} is ready to battle!".format(player.number))

    def player_option(self, player):
        print("What will player {} do?".format(player.number))
        choice = int(input())
        if choice < 0 or choice > 3:
            return -1
        else:
            return choice

    def player_target(self, player): # this is the one that is broken, always retyrns -1
        print("Who will player {} face?".format(player.number))
        choice = input()
        for player_number in self.players:
            if player_number.number == choice and player_number.number != player.number:
                return choice
        return -1

    def start_round(self):
        for player in self.players:
            player.status = self.player_option(player)
            if len(self.players) > 2:
                player.target = self.player_target(player)
            else:
                for player_number in self.players:
                    if player.number != player_number.number:
                        player.target = player_number.number

    def evaluate_round(self):
        for player in self.players:
            if player.status == 1:
                player.shoot()
            elif player.status == 2:
                player.block()
            elif player.status == 3:
                player.reload()
            else:
                player.flinch()

        # maybe make this 2 funcs

        for player in self.players:
            if player.status == 1:
                if self.players[player.target].status != 2: # this may return -1, causing unnecesary damage
                    self.players[player.target].is_shot()
            elif player.status == 2:
                if self.players[player.target].status == 1: # this may return -1, causing unnecesary damage
                    self.players[player.target].is_blocked()







jack = Player(0)
serena = Player(1)
sam = Player(2)


game1 = Game([jack,serena,sam])
for i in range(3):
    game1.start_round()
    game1.evaluate_round()
