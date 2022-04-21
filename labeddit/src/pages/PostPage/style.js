import styled from "styled-components";


export const ContainerPost = styled.div`
    text-align:center;
    color: orangered;
    max-width:100vw;
    min-height:100vh;
    h1{
        background-color: lightgray;
        border-radius:20px;
    }
    button{
        margin-top:5px;
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
    
    div{
        color:black;
        background-color: lightsteelblue;
        border-radius:20px;
        div{
            padding-left: 10vw;
            display:flex;
            flex-direction:column;
            align-items: flex-start;

            h2{
                margin-left: 5px;
                height: 5px;
            }
            h3{
                margin-left: 5px;
                height:5px;
            }
            p{
                margin-left: 60px;
            }
        }
        .comentsVotes{
            color:orangered;
            width:70vw;
            display:flex;
            flex-direction:row;
            justify-content: center;
            background-color: transparent;
            p{
                font-size:x-large;
            }
        }
        button{
            width: 150px;
            height: 30px;
            margin-left: 10px;
            font-weight: 600;
            background-color:royalblue;
            color:white;
            border-radius:10px;
            :hover{
                cursor: pointer;
                background-color:orange
            }
        }
    }
    form{
        color: black;
        display:flex;
        flex-direction:column;
        align-items:center;
        width:100%;
        padding-bottom: 30px;
        input{
            height:100px;
            margin-top:15px;
            width: 300px;
            border-radius:10px;
        }
        .inputPost{
            height: 100px;
        }
        button{
            margin-top:15px;
            width: 150px;
            height: 30px;
            font-weight: 600;
            background-color:royalblue;
            border-radius:10px;
            :hover{
                cursor: pointer;
                background-color:orange
            }
        }
    }
    .animista{
	animation: scale-up-center 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
    @keyframes scale-up-center{0%{transform:scale(.5)}100%{transform:scale(1)}}
   
`