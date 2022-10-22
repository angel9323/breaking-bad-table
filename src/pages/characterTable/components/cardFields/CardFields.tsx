
import { useTranslation } from "react-i18next";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardText from '../../../../components/cardText';
import Character from '../../../../interfaces/Character';

interface CardFieldProps {
    character: Character;
}

const CardFields = ({character}: CardFieldProps) => {
    const { t } = useTranslation();
    const nameLabel = t('name');
    const birthdayLabel = t('birthday');
    const occupationLabel = t('occupation');
    const statusLabel = t('status');
    const appearanceLabel = t('appearance');
    const nicknameLabel = t('nickname');
    const portrayedLabel = t('portrayed');

    const adaptedObject: [string, string][] = [[nameLabel, character.name], [birthdayLabel, character.birthday], 
    [occupationLabel, character.occupation.join(', ')], [statusLabel, character.status],
    [appearanceLabel, character.appearance.join(', ')], [nicknameLabel, character.name],
    [portrayedLabel, character.portrayed]];

    return (
    <CardContent>
        <CardMedia
              component="img"
              sx={{
                boxShadow: 1,
                borderRadius: 2,
                height: 120,
                width: 90
              }}
              image={character.img}
        />
        {adaptedObject.map((characteristic, index) =>
        <CardText key={index} label={characteristic[0]} labelValue={characteristic[1]} />)}
    </CardContent>
    );
  }
  
  export default CardFields;