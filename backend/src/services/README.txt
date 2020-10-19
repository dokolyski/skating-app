Tutaj umieszczamy wszystkie serwisy, funkcje odpowiadające za logikę aplikacji. Funkcje powinny być oznaczane jako asynchroniczne - słówko 'async', argumentem powinna być zmienna o nazwie 'body' z oznaczeniem typu zdefiniowanego w folderze api w odpowiednim pliku. Powinna zwracać Promise, którego 1 parametrem powinien być obiekt zwracany przez tą funkcje lub void, kolejnymi powinny być zwracane błędy dziedziczące po typie Error.

Na przykład:

export async function signIn(body: API.USER.LOGIN.POST.INPUT): Promise<{ user_id: number, token: string, expiresIn: number } | Error | LogicError>

Można całą logikę umieścić w bloku try {} catch, przechwytywać błędy przez nas nie wykryte. Error jest błędem niezależnym od użytkownika, LogicError jest błędem użytkownika.