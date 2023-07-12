import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    board: {
        listIds: ['list0'],
        listsById:{list0:{text:'디폴트', _id:'list0' , cards:['card1']}},
        cardsById: {
            card1:{text: '디폴트카드',_id:'card1' }
        },
    },
}
export const BoardReducer = createSlice({
    name:'BOARD',
    initialState,
    reducers: {
        ADD_LIST: (state, action) => {
            // const { listId } = action.payload;
            // return { lists: [...state.lists, listId] };
        },
        MOVE_LIST: (state, action) => {
            // const { oldListIndex, newListIndex } = action.payload;
            // const newLists = Array.from(state.lists);
            // const [removedList] = newLists.splice(oldListIndex, 1);
            // newLists.splice(newListIndex, 0, removedList);
            // return { lists: newLists };
        },
        DELETE_LIST: (state, action) => {
            // const { listId } = action.payload;
            // const filterDeleted = tmpListId => tmpListId !== listId;
            // const newLists = state.lists.filter(filterDeleted);
            // return { lists: newLists };
        }
    },
    extraReducers:{

    }
})

export const {
    ADD_LIST,
    MOVE_LIST,
    DELETE_LIST
} = BoardReducer.reducer

export const boardReducer = {
    page: BoardReducer.reducer
}