import prodConfig from "src/redux/store/configureStore.prod";
import devConfig from "src/redux/store/configureStore.dev";
import { config } from 'src/conf/config';

export const configureStore = config.isProd ? prodConfig : devConfig;
