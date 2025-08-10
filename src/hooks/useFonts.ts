import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  console.log('🎨 Loading SF Pro fonts...');
  
  const [fontsLoaded, fontError] = useFonts({
    'SFProDisplay-Regular': require('../../assets/fonts/SFProDisplay-Regular.otf'),
    'SFProDisplay-Medium': require('../../assets/fonts/SFProDisplay-Medium.otf'),
    'SFProDisplay-Semibold': require('../../assets/fonts/SFProDisplay-Semibold.otf'),
    'SFProDisplay-Bold': require('../../assets/fonts/SFProDisplay-Bold.otf'),
  });

  if (fontError) {
    console.error('❌ SF Pro loading failed:', fontError);
  } else if (fontsLoaded) {
    console.log('✅ SF Pro fonts loaded successfully');
  }

  return fontsLoaded;
};