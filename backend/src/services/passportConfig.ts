import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as AuthTokenStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";

import { User } from "../models/userModel";
import { Error } from "mongoose";

type UserType = InstanceType<typeof User>;

passport.use(
  "token",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: UserType) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(
        password,
        user.password,
        (err: Error | null, res: boolean) => {
          if (err) {
            return done(err);
          }
          if (!res) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        }
      );
    });
  })
);

interface authVar {
  jwtFromRequest: any,
  secretOrKey: string
}

const opts: authVar = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use("auth", new AuthTokenStrategy(opts, function (jwt_payload: any, done: any) {
  console.log("jwt_payload - ", jwt_payload)
  User.findOne({ _id: jwt_payload.userId }, function (err: Error, user: any) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: Error, user: UserType) => {
    done(err, user);
  });
});
