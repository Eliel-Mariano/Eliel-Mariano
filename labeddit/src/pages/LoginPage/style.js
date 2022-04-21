import styled from "styled-components";


export const ContainerLogin = styled.div`
    text-align:center;
    color: orangered;
    max-width:100vw;
    min-height:100vh;
    h1{
        text-align:start;
        width:200px;
        margin-bottom:100px;
        padding-top: 50px;
    }
    h1{animation:slide-right 5s cubic-bezier(.25,.46,.45,.94) infinite alternate both};
    @keyframes slide-right{0%{transform:translateX(0)}100%{transform:translateX(45vW)}};
    form{
        color: black;
        display:flex;
        flex-direction:column;
        align-items:center;
        width:100%;
        padding-bottom: 30px;
        input{
            margin-top:15px;
            width: 300px;
        }
        button{
            margin-top:15px;
            width: 150px;
            height: 30px;
            font-weight: 600;
            background-color:orangered;
            border-radius:10px;
            :hover{
                cursor: pointer;
                background-color:orange
            }
        }
    }
    button{
        width: 300px;
        height: 30px;
        font-weight: 600;
        background-color:orangered;
        color:white;
        border-radius:10px;
        :hover{
            cursor: pointer;
            background-color:orange
        }
    }
`