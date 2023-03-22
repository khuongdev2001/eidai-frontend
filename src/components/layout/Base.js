import styled,{ css } from "styled-components";

export const BoxFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonAction = styled.button`
    background: none;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
            case "success":
                return css`
                    background-color:#436645;
                    color:var(--light);
                    `
        }
    }
    }
`;