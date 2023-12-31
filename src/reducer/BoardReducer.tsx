import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {cloneDeep, find} from "lodash";
import {loadBoardAsync} from "@/services/Board";

interface IBoard {
    listIds?: string[];
    listsById?: object
    cardsById?: object;
}

const initialState:IBoard = {
        listIds: ['list0'],
        listsById:{
            list0:{text:'디폴트', _id:'list0' , cards:['card1']}
        },
        cardsById: {
            'card1':{text: '디폴트카드',_id:'card1' }
        },
}

export const BoardReducer = createSlice({
    name:'BOARD',
    initialState,
    reducers: {
        ADD_LIST: (state= state, action) => {
            const { listId, listTitle } = action.payload;
            state.listIds.push(listId)
            state.listsById = {
                ...state['listsById'],
                [listId]:{ text: listTitle,_id:listId, cards: [] }

            }
        },
        MOVE_LIST: (state=state, action) => {
            const { oldListIndex, newListIndex } = action.payload;
            console.log(oldListIndex, newListIndex,'data')
            const newLists = Array.from(state.listIds);
            const [removedList] = newLists.splice(oldListIndex, 1);
            newLists.splice(newListIndex, 0, removedList);
            state.listIds = newLists
        },
        DELETE_LIST: (state=state, action) => {
            const { listId } = action.payload;
            const newLists = state.listIds.filter( ids =>  ids !== listId)
            const toDeleteCard = state.listsById[listId].cards
            toDeleteCard.forEach(v => {
                delete state.cardsById[v]
            })
            delete state.listsById[listId]
            state.listIds = newLists

        },
        ADD_CARD: (state= state,action) => {
            const {cardText, cardId, listId} = action.payload;
            const base = cloneDeep(state)

            base.cardsById = {
                ...base.cardsById,
                [cardId]: {
                    text: cardText, _id: cardId
                }
            }
            state.listsById[listId].cards.push(cardId)
            state.cardsById = base.cardsById

        },
        CHANGE_CARD_TEXT: (state= state, action) => {
            const { cardText, cardId } = action.payload;
            state.cardsById[cardId] = { _id:cardId, text: cardText}
        },
        DELETE_CARD: (state= state, action) => {
            const { cardId, listId } = action.payload;
            const newCardIds= state.listsById[listId].cards.filter(v => v !== cardId)
            delete state.cardsById[cardId]
            state.listsById[listId] = {...state.listsById[listId], cards: [...newCardIds]}

        },
        MOVE_CARD: (state= state, action) => {
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId,
                destListId
            } = action.payload;

            // 동일 리스트 안에서 이동
            if (sourceListId === destListId) {
                console.log('동일')
                const newCards = Array.from(state.listsById[sourceListId].cards);
                const [removedCard] = newCards.splice(oldCardIndex, 1);
                newCards.splice(newCardIndex, 0, removedCard);
                state.listsById[sourceListId] = { ...state.listsById[sourceListId], cards: [...newCards] }
            } else {
                // 다른 리스트로 이동
                console.log('다른')
                const sourceCards = Array.from(state.listsById[sourceListId].cards);
                console.log(sourceCards,'sourceCards')
                const [removedCard] = sourceCards.splice(oldCardIndex, 1);
                const destinationCards = Array.from(state.listsById[destListId].cards);
                destinationCards.splice(newCardIndex, 0, removedCard);
                state.listsById[sourceListId] = { ...state.listsById[sourceListId], cards: [...sourceCards] }
                state.listsById[destListId] = { ...state.listsById[destListId], cards: [...destinationCards] }
            }


        },
    },
    extraReducers:{
        [loadBoardAsync.pending.type]: (state, action) => {},
        [loadBoardAsync.fulfilled.type]: (state, action) => {},
        [loadBoardAsync.rejected.type]: (state, action) => {},
    }
})



export const {
    ADD_LIST,
    MOVE_LIST,
    DELETE_LIST,
    ADD_CARD,
    CHANGE_CARD_TEXT,
    DELETE_CARD,
    MOVE_CARD
} = BoardReducer.actions


export const boardReducer = {
    boardStore: BoardReducer.reducer,
}