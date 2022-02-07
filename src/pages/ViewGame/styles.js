import styled from 'styled-components';
import { MdKeyboardBackspace } from 'react-icons/md'


export const Container = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    cursor: default;

    h1{
        font-size: 52px;
    }

    .content-left{
        /* background: red; */
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        h2{
            margin: 16px 0;
        }

        .content-details{
            display: flex;
            margin: 16px 0px;
            flex-direction: row;
            
            h5{
                color: ${({ theme }) => theme.colors.primary.dark};
                text-decoration: underline;
                margin: 8px 0px;
                transition: all ease-in 0.2s;

                &:hover{
                    color: #fff
                }
            }

            .paragraph-detail-align{
                display: flex;
                flex-direction: row;    
                flex-wrap: wrap;
            }
            
            .data-left-details{
                width: 50%;
            }

            .data-right-details{
                width: 50%;
                margin-left: 12px;
            }
        }
    }

    .content-right{
        /* background: green; */
        width: 30%;
        margin-left: 16px;

        .main-img{
            width: 100%;
            
            .game-img{
                width: 100%;
                /* height: 180px; */
                border-radius: 8px;
            }
        }

        .content-rating{
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            .rating{
                min-width: 130px;
                height: 30px;
                border-radius: 8px;
                margin: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(to right, red, purple);
                padding: 0 4px;
                transition: all ease-in 0.3s;
                
                p{
                    font-size: 12px;
                    text-transform: capitalize;

                }

                &:hover{
                    padding: 20px;
                }
            }
        }
 
    }
`

export const BackPage = styled(MdKeyboardBackspace)`
    width: 30px;
    height: 30px;
    fill: #fff;
    position: absolute;
    margin-top: -20px;
    cursor: pointer;
`;