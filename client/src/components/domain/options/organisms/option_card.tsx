import {
  Content,
  RadioButton
} from "../../../common/atoms/index";

import styled from "styled-components";
import useLocalStorage from "../../../custom_hooks/uselocalstorage";

interface Props {
  name: string;
}

const OptionItem = styled.div`
  display:flex;
  margin: 1.0rem 0;
`;

export default function OptionCard({
  name
}: Props) {

  const [currentLevel, setCurrentLevel] = useLocalStorage({
    key: "difficulty",
    defaultValue: "easy"
  }, (val: string) => ["easy", "normal", "hard"].filter(ele => ele === val).length > 0)

  const levels = [
    ["easy", "쉬움 9 X 9 지뢰개수 : 10"],
    ["normal", "보통 16 X 16 지뢰개수 : 40"],
    ["hard", "어려움 30 X 16 지뢰개수 : 99"]
  ] as const;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("difficulty", e.currentTarget.value);
    setCurrentLevel(e.currentTarget.value);
  }

  return (
    <>
      <div>
        <Content
          fontColor={true}
          bold={true}
          fontSize={"1.1rem"}
        >
          {name}
        </Content>
        {levels.map((level, idx) =>
          <OptionItem key={idx}>
            <RadioButton
              name={"level"}
              value={level[0]}
              id={level[0]}
              change={onChange}
              check={level[0] === currentLevel}
            />
            <label htmlFor={level[0]}>
              <Content
                margin={"0px 10px"}
              >
                {level[1]}
              </Content>
            </label>
          </OptionItem>
        )}
      </div>
    </>
  )
}