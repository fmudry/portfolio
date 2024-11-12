from __future__ import annotations

from time import sleep
from typing import List, Optional, Tuple

from dataclasses import dataclass
from random import shuffle

from GmailSender import GmailSender


@dataclass
class Person:
    name: str
    email: str
    target_name: str | None

class KillingGame():

    def __init__(self):
        self.gmail_sender = GmailSender("fiwell.notifications@gmail.com")

        self.places = [
            "kitchen",
            "bedroom",
            "bathroom",
            ]
        self.items = [
            "pen", "spoon", "notebook", "phone charger", "water bottle",
            "keychain (key/-s)", "book", "chapstick", "hairbrush",
            "scarf", "umbrella", "coffee cup", "wallet", "watch",
            "tissue pack", "coin", "sunglasses",
            "eraser", "pencil", "mouse", "USB drive",
            "power bank", "candle", "bracelet", "bookmark", "toothbrush",
            "hand towel", "phone case", "belt",
            "notepad", "headphones", "cup", "backpack", "dish rag"
            "pencil", "hair tie", "card (ID/ISIC, etc.)"
            "ring", "phone", "fork", "knife", "bowl", "plate"
            "hat", "scissors", "can", "T-shirt", "receipt", 
            ]
    
        self.people = [
            Person(name="Person 1", email="email@email.com", target_name=None),
            ]

        assert len(self.items) >= len(self.people)

    def __connect_targets(self) -> None:
        '''
        Connects targets so they form one circle.
        '''
        for i in range(0, len(self.people)):
            target_i = (i + 1) % len(self.people)
            self.people[i].target_name = self.people[target_i].name
        
    def __get_random_triplets(self) -> List[Tuple[str, str, str]]:
        '''
        Shuffles places, items and people. Number of triplets returned
        is based on number of people.

        Returns a list of: (place, item, person)
        '''
        shuffle(self.places)
        shuffle(self.items)
        shuffle(self.people)
        self.__connect_targets()

        return [(self.places[i], self.items[i], self.people[i]) 
                for i in range(len(self.people))]
    
    def __send_email(self, place: Optional[str], item: str, person: Person) -> None:
        subject = "'Killing' game instructions"
        game_end = "15.12.2024 23:59"
        has_place = place is not None

        body = ("Welcome to the 'killing' game.\n\n" 

                f"Your target: {person.target_name}\n"
                f"Your place: {'It does not matter.' if place is None else place}\n"
                f"Your item: {item}\n"
                f"END OF THE GAME: {game_end}\n\n"

                "Instructions:\n"
                "Point of the game is to 'kill' your target.\n"
                f"'Killing' your taget means that you have to hand them item (do not use force xd){' in a specific place.' if has_place else '.'}\n"
                f"You can find your{' place and ' if has_place else ''} item for your first target above.\n\n"
        
                "When you get 'killed':\n"
                f"Give your murderer the information about their next target ({'place, ' if has_place else ''}item, name).\n"
                "You can make a paper copy and just give it to them.\n\n"
                
                "Last player standing wins! Good luck :)")

        self.gmail_sender.send_email(person.email, subject, body)

    def run(self, include_place=False) -> None:
        triplets = self.__get_random_triplets()

        for place, item, person in triplets:
            place = place if include_place else None
            self.__send_email(place, item.capitalize(), person)
            sleep(4)

if __name__ == "__main__":
    kg = KillingGame()
    kg.run(False)
