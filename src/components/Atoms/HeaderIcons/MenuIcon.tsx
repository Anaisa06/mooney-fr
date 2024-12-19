import { useTheme } from '@react-navigation/native';
import { Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCurrentBudget } from 'src/services/budget.services';
import { Drawer } from 'react-native-paper';
import { useState } from 'react';
import React from 'react';



const MenuIcon = () => {

    const theme = useTheme();
    const [active, setActive] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);

    const test = async() => {
      setOpenDrawer(!openDrawer);


    };
  return (
  <>
      <Icon name="menu-outline" style={{fontSize: 40, color: theme.colors.text}} onPress={test}/>
     {/* {
      openDrawer &&
      <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
     } */}

  </>
  );
};

export default MenuIcon;
