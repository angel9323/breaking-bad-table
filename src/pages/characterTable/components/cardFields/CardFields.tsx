
import { useTranslation } from "react-i18next";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardText from '../../../../components/cardText';
import Character from '../../../../interfaces/Character';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch } from '../../../../redux/store';
import { updateCharacter } from "../../../../redux/charactersSlice";
import { useState } from "react";
import './styles.scss';

interface CardFieldProps {
    character: Character;
}

const CardFields = ({character}: CardFieldProps) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState(character.description ? character.description : '');
    const { t } = useTranslation();
    const nameLabel = t('name');
    const birthdayLabel = t('birthday');
    const occupationLabel = t('occupation');
    const statusLabel = t('status');
    const appearanceLabel = t('appearance');
    const nicknameLabel = t('nickname');
    const portrayedLabel = t('portrayed');
    const descriptionLabel = t('description');

    const adaptedObject: [string, string][] = [[nameLabel, character.name], [birthdayLabel, character.birthday], 
    [occupationLabel, character.occupation.join(', ')], [statusLabel, character.status],
    [appearanceLabel, character.appearance.join(', ')], [nicknameLabel, character.name],
    [portrayedLabel, character.portrayed]];
    
    const handleOnBlurTextField = (event: any) => {
      const newDescription:string = event.target.value
      dispatch(updateCharacter({character, newDescription }))
    }

    return (
    <CardContent>
        <CardMedia
              component="img"
              sx={{
                boxShadow: 1,
                borderRadius: 2,
                height: 200,
                width: 150
              }}
              image={character.img}
        />
        {adaptedObject.map((characteristic, index) =>
        <CardText key={index} label={characteristic[0]} labelValue={characteristic[1]} />)}
        <Box className="boxStyle">
          <Typography className="boxStyle" variant="h6" component="div">
              <div>{descriptionLabel}:</div> 
              <TextField size="small" className='textField' sx={{marginLeft: '2%'}} value={text} onChange={(e)=>setText(e.target.value)} onBlur={handleOnBlurTextField}/>
          </Typography>
        </Box>
    </CardContent>
    );
  }
  
  export default CardFields;