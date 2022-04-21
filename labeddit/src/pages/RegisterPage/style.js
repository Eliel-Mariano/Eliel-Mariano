import styled from "styled-components";


export const ContainerRegister = styled.div`
    text-align:center;
    color: orangered;
    width:95vw;
    max-width:900px;
    height:95vh;
    h1{
        text-align:center;
        margin-bottom:50px;
        padding-top: 50px;
    }
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