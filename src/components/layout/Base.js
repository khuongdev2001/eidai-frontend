import styled, { css } from "styled-components";

export const BoxFlex = styled.div`
    display:flex;
    flex-wrap:wrap;
    ${(props) => {
        if (props.sx) {
            return css`
                ${(props.sx)}
            `
        }
    }
    }
    ${(props) => {
        switch (props.textAlign) {
            case "center":
                return css`
                    text-align:center;
                `;
            default:
        }
    }
    }
    ${(props) => {
        if (props.justifyContent) {
            return css`
                justify-content:${props.justifyContent};
            `
        }
    }
    }
    ${(props) => {
        switch (props.alignItems) {
            case "center":
                return css`
                    align-items:center;
                `;
            default:
                return css`
                    align-items:end;
                `
        }
    }
    }
    ${(props) => {
        switch (props.background) {
            case "light":
                return css`
                    background:var(--light);
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
            default:
        }
    }
    }
    ${(props) => {
        switch (props.shadow) {
            case "sm":
                return css`
                    box-shadow: 0px 0px 10px #5c585830;
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
            default:
        }
    }
    }
    ${(props) => {
        switch (props.borderRadius) {
            case "sm":
                return css`
                        border-radius:5px;
                    `;
            case "space-between":
                return css`
                        justify-content:space-between;
                    `
            default:
        }
    }
    }
`;

export const ButtonAction = styled.button`
    background: none;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display:inline-block;
    ${props => props.my && css`
        margin-top: ${props.my}px;
        margin-bottom: ${props.my}px;
    `}
  ${props => props.mx && css`
        margin-left: ${props.mx}px;
        margin-right: ${props.mx}px;
    `}
    ${(props) => {
        switch (props.type) {
            case "info":
                return css`
                    background-color:#3498db;
                    color:var(--light);
                    `
            case "danger":
                return css`
                    background-color:#e74c3c;
                    color:var(--light);
                    `
            default:
        }
    }
    }
`;

export const H3 = styled.h3`
    font-size:25px;
    font-weight:bold;
    ${props => props.px && css`
        padding-left: ${props.px}px;
        padding-right: ${props.px}px;
    `}
    ${props => props.py && css`
        padding-top: ${props.py}px;
        padding-bottom: ${props.py}px;
    `}
`;

export const H4 = styled.h3`
    font-size:20px;
    font-weight:bold;
    ${props => props.px && css`
        padding-left: ${props.px}px;
        padding-right: ${props.px}px;
    `}
    ${props => props.py && css`
        padding-top: ${props.py}px;
        padding-bottom: ${props.py}px;
    `}

`;

export const Thumbnail = styled.img`
    width: 100%;
`;
