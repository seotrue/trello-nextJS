
## Getting Started


## Dependencies
- [react-textarea-autosize](https://github.com/andreypopp/react-textarea-autosize)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [lodash](https://www.npmjs.com/package/lodash)
- [shortid](https://github.com/dylang/shortid)

## 구조
```
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── components
    │   └── AddList.tsx
    │   └── Card.tsx        
    │   └── CardEditor.tsx 
    │   └── EditButton.tsx
    │   └── List.tsx    
    │   └── ListEditor.tsx    
    ├── pages
    │   └── _app.tsx
    │   └── board.tsx
    ├── reducer
    │   └── BoardReducer.tsx
    │   └── index.tsx
    ├── service
    │   └── index.tsx
    ├── store
    │   └── index.tsx
    └── styles
         └── AddList.tsx
         └── App.tsx
         └── Board.tsx
         └── Card.tsx        
         └── CardEditor.tsx 
         └── EditButton.tsx
         └── List.tsx    
         └── ListEditor.tsx    
```

## component
- 기능 단위  
- 
    1. List.tsx : 리스트
    2. AddList : 리스트 추가
    3. ListEditor: 리스트 편집,삭제
    4. Card.tsx : 카드
    5. CardEditor: 카드 편집
    6. EditButton: 기능성 버튼
    7. 
    8. ListEditor: 리스트 편집,삭제
