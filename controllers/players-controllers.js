const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Player = require("../models/player");
const User = require("../models/user");
const mongoose = require("mongoose");
const { get } = require("../routes/users-routes");
const player = require("../models/player");

const getPlayerById = async (req, res, next) => {
  const playerId = req.params.id;

  let player;
  try {
    player = await Player.findById(playerId);
  } catch (err) {
    const error = new HttpError("Couldn't find player", 500);
    return next(error);
  }

  if (!player) {
    const error = new HttpError("Couldn't find player", 404);
    return next(error);
  }

  res.json({ player: player.toObject({ getters: true }) });
};

const createPlayer = async (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed", 422);
  }

  const { first_name, last_name, team, position, nationality, jersey_number } =
    req.body;
  const createdPlayer = new Player({
    first_name,
    last_name,
    team,
    position,
    nationality,
    jersey_number,
  });

  let user;

  // check authentication

  // try {
  //   user = await User.findById(creator);
  // } catch (err) {
  //   const error = new HttpError("Create player failed", 500);
  //   return next(error);
  // }

  // if (!user) {
  //   const error = new HttpError("Couldn't find user id ", 500);
  //   return next(error);
  // }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlayer.save({ session: sess });
    user.players.push(createdPlayer);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Create player failed", 500);
    return next(error);
  }

  res.status(201).json({ player: createdPlayer });
};

const updatePlayer = async (req, res, next) => {
  const { first_name, last_name, team, position, nationality, jersey_number } =
    req.body;
  const playerId = req.params.id;

  let player;

  try {
    player = await Player.findById(playerId);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update", 500);
    return next(error);
  }

  player.first_name = first_name;
  player.last_name = last_name;
  player.team = team;
  player.position = position;
  player.nationality = nationality;
  player.jersey_number = jersey_number;

  try {
    await player.save();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update", 500);
    return next(error);
  }

  res.status(200).json({ player: player.toObject({ getters: true }) });
};

const getPlayers = async (req, res, next) => {
  let players;
  try {
    players = await Player.find({});
  } catch (err) {
    console.log(errerror);
    return next(error);
  }

  res.json({
    players: players.map((player) => player.toObject({ getters: true })),
  });
};

exports.getPlayers = getPlayers;
exports.getPlayerById = getPlayerById;
exports.createPlayer = createPlayer;
exports.updatePlayer = updatePlayer;
