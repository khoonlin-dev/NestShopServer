import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import entities from "./typeorm";
import { SearchModule } from "./search/search.module";
import { OrderModule } from "./order/order.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get<number>("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                entities: entities,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        SearchModule,
        OrderModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}