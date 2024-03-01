"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
passport_1.default.use("token", new passport_local_1.Strategy((username, password, done) => {
    userModel_1.User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        bcryptjs_1.default.compare(password, user.password, (err, res) => {
            if (err) {
                return done(err);
            }
            if (!res) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        });
    });
}));
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport_1.default.use("auth", new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    console.log("jwt_payload - ", jwt_payload);
    userModel_1.User.findOne({ _id: jwt_payload.userId }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    userModel_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
