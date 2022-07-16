<script>
	/** @type {string} - time it took user to find all matches */
	export let score;
</script>

<!-- Write to a DB? -->
<form>
	<label
		>Congrats you finished in
		<input type="text" id="score" name="score" readOnly value={score} />
	</label>
	<label
		>Please enter a username to save your score
		<input type="text" id="username" name="username" required placeholder="Username" />
	</label>
	<input type="submit" id="submmit" name="submit" class="btn" />
</form>
