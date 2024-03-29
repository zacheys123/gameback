import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema(
	{
		profilepicture: { type: String, default: '' },
		firstname: { type: String },
		lastname: { type: String },
		phone1: { type: String },
		state: { type: String },
		company_type: { type: String },
		username: {
			type: String,
		},
		email: {
			type: String,

			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
		},
		password: {
			type: String,
			required: false,
			minlength: 6,
		},
		jti: {
			type: String,
			required: false,
		},
		isAdmin: { type: Boolean, default: false },

		city: {
			type: String,
			max: 50,
		},
		package: { type: String },
		marital: { type: String, max: 50 },
		occupation: { type: String, max: 50 },
		company: { type: String },
		phone: { type: String },
		games: [
			{
				player1_team: {
					type: String,
				},
				player1: {
					type: String,
					required: true,
				},
				telno1: {
					type: String,
				},

				player2_team: {
					type: String,
				},
				player2: {
					type: String,
				},
				p1goals: {
					type: String,
				},
				p2goals: {
					type: String,
				},
				telno2: {
					type: String,
				},

				amount: {
					type: Number,
				},
				paid: {
					type: String,
				},
				station: {
					type: Number,
				},
				outcome: {
					type: String,
				},

				best_amount: {
					type: String,
				},
				penalty_amount: {
					type: String,
				},

				_id: {
					type: String,
				},
				created_at: {
					type: String,
					required: true,
					default: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				},
			},
		],
		theme: { type: Boolean, default: false },
		secret: { type: String },
		secret_question: { type: String },
		tourn: { type: String },
		tournament: [
			{
				facilitator: { type: String },
				tournname: { type: String },
				type: { type: String },
				noplayers: { type: String },
				amount: { type: String },
				winner: { type: String },
				second_runner: { type: String },
				first_runner: { type: String },
				prize: { type: String },
			},
		],

		resetpassortoken: String,
		requiredresetpasswordexpire: Date,
	},
	{ timestamps: true },
);
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	// generate a salt
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model('User', UserSchema);
export default User;
