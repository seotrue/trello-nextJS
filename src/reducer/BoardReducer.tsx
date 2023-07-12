import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {cloneDeep, find} from "lodash";

interface IBoard {
    listIds?: string[];
    listsById?: object
    cardsById?: object;
}
// interface IList {
//     [propName:string] :{
//         text:string,
//         _id:string,
//         cards: []
//     }
// }
//
// interface ICard {
//     [propName:string] :{
//         text:string,
//         _id:string,
//     }
// }

const initialState:IBoard = {
        listIds: ['list0'],
        listsById:{
            list0:{text:'디폴트', _id:'list0' , cards:['card1']}
        },
        cardsById: {
            card1:{text: '디폴트카드',_id:'card1' }
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
            const base = cloneDeep(state)
            base.cardsById = {
                ...base.cardsById,
                [cardId]: {
                    text: cardText
                }
            }
            state.cardsById = base.cardsById
        },

        DELETE_CARD: (state= state, action) => {
            const { cardId } = action.payload;
            const base = cloneDeep(state)
            delete base.cardsById[cardId]
            state.cardsById = base.cardsById
        },
    },
    extraReducers:{

    }
})



export const {
    ADD_LIST,
    MOVE_LIST,
    DELETE_LIST,
    ADD_CARD,
    CHANGE_CARD_TEXT,
    DELETE_CARD,
} = BoardReducer.actions


export const boardReducer = {
    boardStore: BoardReducer.reducer,
}