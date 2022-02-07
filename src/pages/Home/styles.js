import styled from 'styled-components';
import {css} from 'styled-components'

import { FaPlaystation, FaXbox, FaWindows } from 'react-icons/fa'

const iconsComponent = css`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    fill: #7C7C7C;
`

export const Container = styled.div`
    margin-top: 32px;

    .search{
        display: flex;
        flex-direction: row;

        >button{
            border: none;
            padding: 0 16px;
            background: linear-gradient(180deg, rgba(51,102,255,1) 30%, rgba(37,37,37,1) 100%);
            margin: 0 34px;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.lighter};
            border-radius: 4px;
            transition: border 0.2s ease-in;
            text-decoration: underline;

            &:active {
                background: ${({ theme }) => theme.colors.primary.dark};
            }
        }
    }
    

    .header {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-between;
        margin-bottom: 52px;
    }

    @media(max-width: 767px) {
        .search{
            flex-direction: column;

            >button{
                width: 100%;
                height: 50px;
                margin: 0px;
                margin-top: 12px;
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 52px;
    flex-wrap: wrap;

    .content-card{
        width: 280px;
        margin-bottom: 24px;
        margin-right: 32px;
        
        a{
            text-decoration: none;
            color: #FFF;
            font-weight: bold;
            cursor: pointer;
            transition: all ease-in 0.1s;

                &:hover{
                    font-size: 18px;
                    color: ${({ theme }) => theme.colors.primary.light};
                }
            
        }
        

        .game-img{
            width: 100%;
            height: 150px;
            border-radius: 4px;
            position: relative;
        }

        .avaliation{
            background-color: rgba(189, 189, 189, 0.2);
            color: ${({ theme }) => theme.colors.primary.light};
            min-width: 120px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            margin-top: -50px;
            margin-left: 140px;
            font-size: 12px;
            padding: 8px;
            transition: all ease-in 0.1s;
            
            &:hover{
                font-size: 13px;
                /* padding: 10px; */
            }
        }

        .category{
            display: flex;
            flex-direction: row;

            p{
                margin-right: 4px;
            }
        }

    }

    h3 {
        margin-bottom: 4px;
    }

    p {
        font-size: 12px;
        margin-bottom: 8px;
        color: ${({ theme }) => theme.colors.primary.light};
    }

    @media(max-width: 767px) {
        .content-card{
            width: 100%;
            margin-right: 0px;
        }
    }
`;

export const PlaystationIcon = styled(FaPlaystation)`
    ${iconsComponent}
`;

export const XboxIcon = styled(FaXbox)`
    ${iconsComponent}
`;

export const WinIcon = styled(FaWindows)`
    ${iconsComponent}
`;


